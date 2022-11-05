import { Bytes } from "@graphprotocol/graph-ts";
import { DeployPepperStake } from "../../generated/PepperStakeDeployer/PepperStakeDeployer";
import {
  DeployPepperStakeEvent,
  PepperStakeContract,
} from "../../generated/schema";
import { PepperStake } from "../../generated/templates";

export function handleDeployPepperStake(event: DeployPepperStake): void {
  let deployPepperStakeEvent = new DeployPepperStakeEvent(
    event.transaction.hash.toHexString().toLowerCase()
  );
  if (deployPepperStakeEvent) {
    deployPepperStakeEvent.timestamp = event.block.timestamp.toI32();
    deployPepperStakeEvent.txHash = event.transaction.hash;

    PepperStake.create(event.params.pepperStake);
  }
  let pepperStakeContract = new PepperStakeContract(
    event.transaction.hash.toHexString().toLowerCase()
  );
  if (pepperStakeContract) {
    pepperStakeContract.supervisors = changetype<Bytes[]>(
      event.params._supervisors
    );
    pepperStakeContract.unreturnedStakeBeneficiaries = changetype<Bytes[]>(
      event.params._unreturnedStakeBeneficiaries
    );
    pepperStakeContract.address = event.params.pepperStake;
    pepperStakeContract.creator = event.transaction.from;
    pepperStakeContract.stakeAmount = event.params._stakeAmount;
    pepperStakeContract.returnWindowDays = event.params._returnWindowDays;
    pepperStakeContract.maxParticipants = event.params._maxParticipants;
    pepperStakeContract.shouldParticipantsShareUnreturnedStake =
      event.params._shouldParticipantsShareUnreturnedStake;
    pepperStakeContract.shouldUseSupervisorInactionGuard =
      event.params._shouldUseSupervisorInactionGuard;
    pepperStakeContract.metadataURI = event.params._metadataURI;
    pepperStakeContract.save();
  }
  deployPepperStakeEvent.pepperStakeContract = pepperStakeContract.id;
  deployPepperStakeEvent.save();
}
