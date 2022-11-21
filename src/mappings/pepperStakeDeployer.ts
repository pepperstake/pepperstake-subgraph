import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { DeployPepperStake } from "../../generated/PepperStakeDeployer/PepperStakeDeployer";
import {
  DeployPepperStakeEvent,
  PepperStakeContract,
} from "../../generated/schema";
import { PepperStake } from "../../generated/templates";

const MAX_FEE = BigInt.fromI32(1_000_000_000);

function getFeePercentage(fee: BigInt): BigDecimal {
  return fee.div(MAX_FEE).toBigDecimal();
}

export function handleDeployPepperStake(event: DeployPepperStake): void {
  let deployPepperStakeEvent = new DeployPepperStakeEvent(
    event.transaction.hash
  );
  if (deployPepperStakeEvent) {
    deployPepperStakeEvent.timestamp = event.block.timestamp;
    deployPepperStakeEvent.txHash = event.transaction.hash;

    PepperStake.create(event.params.pepperStake);
  }
  let pepperStakeContract = new PepperStakeContract(
    event.params.pepperStake.toHexString()
  );

  if (pepperStakeContract) {
    pepperStakeContract.address = event.params.pepperStake;
    pepperStakeContract.creator = event.transaction.from;
    pepperStakeContract.projectId = event.params.projectId.toI32();

    pepperStakeContract.supervisors = changetype<Bytes[]>(
      event.params.launchData.supervisors
    );
    pepperStakeContract.participantAllowList = changetype<Bytes[]>(
      event.params.launchData.participantAllowList
    );
    pepperStakeContract.unreturnedStakeBeneficiaries = changetype<Bytes[]>(
      event.params.launchData.unreturnedStakeBeneficiaries
    );
    pepperStakeContract.oracleDelegateAddresses = changetype<Bytes[]>(
      event.params.launchData.oracleDelegateAddresses
    );
    pepperStakeContract.stakingTiers = event.params.launchData.stakingTiers;

    pepperStakeContract.completionWindowSeconds =
      event.params.launchData.completionWindowSeconds;
    pepperStakeContract.maxParticipants =
      event.params.launchData.maxParticipants;
    pepperStakeContract.shouldUseParticipantAllowList =
      event.params.launchData.shouldUseParticipantAllowList;
    pepperStakeContract.shouldParticipantsShareUnreturnedStake =
      event.params.launchData.shouldParticipantsShareUnreturnedStake;
    pepperStakeContract.shouldUseSupervisorInactionGuard =
      event.params.launchData.shouldUseSupervisorInactionGuard;

    pepperStakeContract.creatorFeePercentage = getFeePercentage(
      event.params.launchData.creatorFee
    );
    pepperStakeContract.creatorFeeBeneficiary =
      event.params.launchData.creatorFeeBeneficiary;
    pepperStakeContract.supervisorTipPercentage = getFeePercentage(
      event.params.launchData.supervisorTip
    );
    pepperStakeContract.protocolFeePercentage = getFeePercentage(
      event.params.protocolFee
    );
    pepperStakeContract.protocolFeeBeneficiary =
      event.params.protocolFeeBeneficiary;

    pepperStakeContract.metadataURI = event.params.launchData.metadataURI;
    pepperStakeContract.save();
  }

  // Finally, save the event
  deployPepperStakeEvent.pepperStakeContract = pepperStakeContract.id;
  deployPepperStakeEvent.save();
}
