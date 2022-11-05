import { Bytes } from "@graphprotocol/graph-ts";
import {
  DistributeSponsorContributionEvent,
  DistributeUnreturnedStakeEvent,
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
} from "../../generated/templates/PepperStake/PepperStake";

export function handleStake(event: Stake): void {
  let stakeEvent = new StakeEvent(
    event.transaction.hash.toHexString().toLowerCase()
  );
  if (stakeEvent) {
    stakeEvent.timestamp = event.block.timestamp.toI32();
    stakeEvent.txHash = event.transaction.hash;
    stakeEvent.participant = event.params.participant;
    stakeEvent.amount = event.params.amount;
    stakeEvent.save();
  }
}

export function handleSponsor(event: Sponsor): void {
  let sponsorEvent = new SponsorEvent(
    event.transaction.hash.toHexString().toLowerCase()
  );
  if (sponsorEvent) {
    sponsorEvent.timestamp = event.block.timestamp.toI32();
    sponsorEvent.txHash = event.transaction.hash;
    sponsorEvent.participant = event.params.participant;
    sponsorEvent.amount = event.params.amount;
    sponsorEvent.save();
  }
}

export function handleReturnStake(event: ReturnStake): void {
  let returnStakeEvent = new ReturnStakeEvent(
    event.transaction.hash.toHexString().toLowerCase()
  );
  if (returnStakeEvent) {
    returnStakeEvent.timestamp = event.block.timestamp.toI32();
    returnStakeEvent.txHash = event.transaction.hash;
    returnStakeEvent.supervisor = event.params.supervisor;
    returnStakeEvent.completingParticipants = changetype<Bytes[]>(
      event.params.completingParticipants
    );
    returnStakeEvent.amount = event.params.amount;
    returnStakeEvent.save();
  }
}

export function handleDistributeUnreturnedStake(
  event: DistributeUnreturnedStake
): void {
  let distributeUnreturnedStakeEvent = new DistributeUnreturnedStakeEvent(
    event.transaction.hash.toHexString().toLowerCase()
  );
  if (distributeUnreturnedStakeEvent) {
    distributeUnreturnedStakeEvent.timestamp = event.block.timestamp.toI32();
    distributeUnreturnedStakeEvent.txHash = event.transaction.hash;
    distributeUnreturnedStakeEvent.caller = event.params.caller;
    distributeUnreturnedStakeEvent.beneficiaries = changetype<Bytes[]>(
      event.params.beneficiaries
    );
    distributeUnreturnedStakeEvent.totalUnreturnedStake =
      event.params.totalUnreturnedStake;
    distributeUnreturnedStakeEvent.sharePerBeneficiary =
      event.params.sharePerBeneficiary;
    distributeUnreturnedStakeEvent.save();
  }
}

export function handleDistributeSponsorContribution(
  event: DistributeSponsorContribution
): void {
  let distributeSponsorContributionEvent = new DistributeSponsorContributionEvent(
    event.transaction.hash.toHexString().toLowerCase()
  );
  if (distributeSponsorContributionEvent) {
    distributeSponsorContributionEvent.timestamp = event.block.timestamp.toI32();
    distributeSponsorContributionEvent.txHash = event.transaction.hash;
    distributeSponsorContributionEvent.caller = event.params.caller;
    distributeSponsorContributionEvent.beneficiaries = changetype<Bytes[]>(
      event.params.beneficiaries
    );
    distributeSponsorContributionEvent.totalSponsorContribution =
      event.params.totalSponsorContribution;
    distributeSponsorContributionEvent.sharePerBeneficiary =
      event.params.sharePerBeneficiary;
    distributeSponsorContributionEvent.save();
  }
}
