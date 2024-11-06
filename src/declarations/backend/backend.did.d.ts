import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ICPMetrics {
  'circulatingSupply' : bigint,
  'marketCap' : number,
  'lastUpdated' : bigint,
  'volume24h' : number,
  'totalSupply' : bigint,
  'price' : number,
}
export interface ICPNutshell {
  'createProposal' : ActorMethod<[string, bigint], Result_3>,
  'getICPMetrics' : ActorMethod<[], Result_2>,
  'getProposalResults' : ActorMethod<[ProposalId], Result_1>,
  'updateICPMetrics' : ActorMethod<[ICPMetrics], Result>,
  'vote' : ActorMethod<[ProposalId, VoteType], Result>,
}
export type ProposalId = bigint;
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = {
    'ok' : { 'no' : bigint, 'yes' : bigint, 'abstain' : bigint }
  } |
  { 'err' : string };
export type Result_2 = { 'ok' : ICPMetrics } |
  { 'err' : string };
export type Result_3 = { 'ok' : ProposalId } |
  { 'err' : string };
export type VoteType = { 'No' : null } |
  { 'Yes' : null } |
  { 'Abstain' : null };
export interface _SERVICE extends ICPNutshell {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
