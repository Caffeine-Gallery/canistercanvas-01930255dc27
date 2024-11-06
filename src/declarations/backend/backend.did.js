export const idlFactory = ({ IDL }) => {
  const ProposalId = IDL.Nat;
  const Result_3 = IDL.Variant({ 'ok' : ProposalId, 'err' : IDL.Text });
  const ICPMetrics = IDL.Record({
    'circulatingSupply' : IDL.Nat,
    'marketCap' : IDL.Float64,
    'lastUpdated' : IDL.Int,
    'volume24h' : IDL.Float64,
    'totalSupply' : IDL.Nat,
    'price' : IDL.Float64,
  });
  const Result_2 = IDL.Variant({ 'ok' : ICPMetrics, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Record({ 'no' : IDL.Nat, 'yes' : IDL.Nat, 'abstain' : IDL.Nat }),
    'err' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const VoteType = IDL.Variant({
    'No' : IDL.Null,
    'Yes' : IDL.Null,
    'Abstain' : IDL.Null,
  });
  const ICPNutshell = IDL.Service({
    'createProposal' : IDL.Func([IDL.Text, IDL.Nat], [Result_3], []),
    'getICPMetrics' : IDL.Func([], [Result_2], ['query']),
    'getProposalResults' : IDL.Func([ProposalId], [Result_1], ['query']),
    'updateICPMetrics' : IDL.Func([ICPMetrics], [Result], []),
    'vote' : IDL.Func([ProposalId, VoteType], [Result], []),
  });
  return ICPNutshell;
};
export const init = ({ IDL }) => { return []; };
