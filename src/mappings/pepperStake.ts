import {
  PepperStakeContract,
  ReturnStakeEvent,
  SponsorEvent,
  StakeEvent,
} from "../../generated/schema";
import {
  Stake,
  Sponsor,
  ReturnStake,
} from "../../generated/templates/PepperStake/PepperStake";

export function handleStake(event: Stake): void {
  let stakeEvent = new StakeEvent(
    event.transaction.hash.toHexString().toLowerCase()
  );
  if (stakeEvent) {
    stakeEvent.timestamp = event.block.timestamp.toI32();
    stakeEvent.txHash = event.transaction.hash;
    stakeEvent.participantAddress = event.params.participant;
    stakeEvent.stakeAmount = event.params.amount;
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
    sponsorEvent.sponsorAddress = event.params.participant;
    sponsorEvent.sponsorAmount = event.params.amount;
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
    returnStakeEvent.supervisorAddress = event.params.sponsor;
    returnStakeEvent.save();
  }
}
