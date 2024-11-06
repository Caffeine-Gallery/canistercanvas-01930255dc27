export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getICPData' : IDL.Func(
        [],
        [
          IDL.Record({
            'marketCap' : IDL.Float64,
            'lastUpdated' : IDL.Int,
            'price' : IDL.Float64,
          }),
        ],
        ['query'],
      ),
    'getVotingResults' : IDL.Func(
        [],
        [IDL.Record({ 'noVotes' : IDL.Nat, 'yesVotes' : IDL.Nat })],
        ['query'],
      ),
    'updateICPData' : IDL.Func([IDL.Float64, IDL.Float64], [], []),
    'vote' : IDL.Func([IDL.Bool], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
