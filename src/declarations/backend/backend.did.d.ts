import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'getICPData' : ActorMethod<
    [],
    { 'marketCap' : number, 'lastUpdated' : bigint, 'price' : number }
  >,
  'getVotingResults' : ActorMethod<
    [],
    { 'noVotes' : bigint, 'yesVotes' : bigint }
  >,
  'updateICPData' : ActorMethod<[number, number], undefined>,
  'vote' : ActorMethod<[boolean], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
