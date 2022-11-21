import { log } from "@graphprotocol/graph-ts";
import { Bytes } from "@graphprotocol/graph-ts";
import {
  ApproveForParticipantsEvent,
  DistributeFeesEvent,
  DistributeSponsorContributionEvent,
  DistributeUnreturnedStakeEvent,
  PepperStakeContract,
  PostCompletionWindowDistributionEvent,
  ReturnStakeEvent,
  SponsorEvent,
  StakeEvent,
} from "../../generated/schema";
import {
  Stake,
  Sponsor,
  ReturnStake,
  DistributeUnreturnedStake,
  DistributeSponsorContribution,
  ApproveForParticipants,
  DistributeFees,
  PostCompletionWindowDistribution,
} from "../../generated/templates/PepperStake/PepperStake";

function getPepperStakeContract(address: Bytes): string {
  let pepperStakeContract = PepperStakeContract.load(address.toHexString());
  if (!pepperStakeContract) {
    log.error("PepperStakeContract not found: {}", [address.toHexString()]);
  }
  return pepperStakeContract!.id;
}

export function handleStake(event: Stake): void {
  let stakeEvent = new StakeEvent(event.transaction.hash);
  if (stakeEvent) {
    stakeEvent.pepperStakeContract = getPepperStakeContract(event.address);
    stakeEvent.timestamp = event.block.timestamp;
    stakeEvent.txHash = event.transaction.hash;
    stakeEvent.participant = event.params.participant;
    stakeEvent.amount = event.params.amount;
    stakeEvent.save();
  }
}

export function handleSponsor(event: Sponsor): void {
  let sponsorEvent = new SponsorEvent(event.transaction.hash);
  if (sponsorEvent) {
    sponsorEvent.pepperStakeContract = getPepperStakeContract(event.address);
    sponsorEvent.timestamp = event.block.timestamp;
    sponsorEvent.txHash = event.transaction.hash;
    sponsorEvent.sponsor = event.params.sponsor;
    sponsorEvent.amount = event.params.amount;
    sponsorEvent.save();
  }
}

export function handleApproveForParticipants(
  event: ApproveForParticipants
): void {
  let approveForParticipantsEvent = new ApproveForParticipantsEvent(
    event.transaction.hash
  );
  if (approveForParticipantsEvent) {
    approveForParticipantsEvent.pepperStakeContract = getPepperStakeContract(
      event.address
    );
    approveForParticipantsEvent.timestamp = event.block.timestamp;
    approveForParticipantsEvent.txHash = event.transaction.hash;
    approveForParticipantsEvent.supervisor = event.params.supervisor;
    approveForParticipantsEvent.participants = changetype<Bytes[]>(
      event.params.participants
    );
    approveForParticipantsEvent.save();
  }
}

export function handleReturnStake(event: ReturnStake): void {
  let returnStakeEvent = new ReturnStakeEvent(event.transaction.hash);
  if (returnStakeEvent) {
    returnStakeEvent.pepperStakeContract = getPepperStakeContract(
      event.address
    );
    returnStakeEvent.timestamp = event.block.timestamp;
    returnStakeEvent.txHash = event.transaction.hash;
    returnStakeEvent.participant = event.params.participant;
    returnStakeEvent.stakeAmount = event.params.stakeAmount;
    returnStakeEvent.fee = event.params.fee;
    returnStakeEvent.returnAmount = event.params.returnAmount;
    returnStakeEvent.save();
  }
}

export function handleDistributeSponsorContribution(
  event: DistributeSponsorContribution
): void {
  let distributeSponsorContributionEvent = new DistributeSponsorContributionEvent(
    event.transaction.hash
  );
  if (distributeSponsorContributionEvent) {
    distributeSponsorContributionEvent.pepperStakeContract = getPepperStakeContract(
      event.address
    );
    distributeSponsorContributionEvent.timestamp = event.block.timestamp;
    distributeSponsorContributionEvent.txHash = event.transaction.hash;

    distributeSponsorContributionEvent.caller = event.params.caller;
    distributeSponsorContributionEvent.beneficiaries = changetype<Bytes[]>(
      event.params.beneficiaries
    );
    distributeSponsorContributionEvent.amount = event.params.amount;
    distributeSponsorContributionEvent.beneficiaryShare =
      event.params.beneficiaryShare;
    distributeSponsorContributionEvent.save();
  }
}

export function handleDistributeFees(event: DistributeFees): void {
  let distributeFeesEvent = new DistributeFeesEvent(event.transaction.hash);
  if (distributeFeesEvent) {
    distributeFeesEvent.pepperStakeContract = getPepperStakeContract(
      event.address
    );
    distributeFeesEvent.timestamp = event.block.timestamp;
    distributeFeesEvent.txHash = event.transaction.hash;
    distributeFeesEvent.caller = event.params.caller;
    distributeFeesEvent.protocolFeeAmount = event.params.protocolFeeAmount;
    distributeFeesEvent.protocolFeeBeneficiary =
      event.params.protocolFeeBeneficiary;
    distributeFeesEvent.creatorFeeAmount = event.params.creatorFeeAmount;
    distributeFeesEvent.creatorFeeBeneficiary =
      event.params.creatorFeeBeneficiary;
    distributeFeesEvent.supervisorTipAmount = event.params.supervisorTipAmount;
    distributeFeesEvent.supervisors = changetype<Bytes[]>(
      event.params.supervisors
    );
    distributeFeesEvent.supervisorShare = event.params.supervisorShare;
    distributeFeesEvent.save();
  }
}

export function handleDistributeUnreturnedStake(
  event: DistributeUnreturnedStake
): void {
  let distributeUnreturnedStakeEvent = new DistributeUnreturnedStakeEvent(
    event.transaction.hash
  );
  if (distributeUnreturnedStakeEvent) {
    distributeUnreturnedStakeEvent.pepperStakeContract = getPepperStakeContract(
      event.address
    );
    distributeUnreturnedStakeEvent.timestamp = event.block.timestamp;
    distributeUnreturnedStakeEvent.txHash = event.transaction.hash;
    distributeUnreturnedStakeEvent.caller = event.params.caller;
    distributeUnreturnedStakeEvent.beneficiaries = changetype<Bytes[]>(
      event.params.beneficiaries
    );
    distributeUnreturnedStakeEvent.amount = event.params.amount;
    distributeUnreturnedStakeEvent.beneficiaryShare =
      event.params.beneficiaryShare;
    distributeUnreturnedStakeEvent.save();
  }
}

export function handlePostCompletionWindowDistribution(
  event: PostCompletionWindowDistribution
): void {
  let postCompletionWindowDistributionEvent = new PostCompletionWindowDistributionEvent(
    event.transaction.hash
  );
  if (postCompletionWindowDistributionEvent) {
    postCompletionWindowDistributionEvent.pepperStakeContract = getPepperStakeContract(
      event.address
    );
    postCompletionWindowDistributionEvent.timestamp = event.block.timestamp;
    postCompletionWindowDistributionEvent.txHash = event.transaction.hash;
    postCompletionWindowDistributionEvent.caller = event.params.caller;
  }
}
