import Bool "mo:base/Bool";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Timer "mo:base/Timer";

import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Time "mo:base/Time";

actor {
  // Simulated ICP data
  stable var price : Float = 5.0;
  stable var marketCap : Float = 1000000000.0;
  stable var lastUpdated : Int = Time.now();

  // Voting data
  stable var yesVotes : Nat = 0;
  stable var noVotes : Nat = 0;

  public query func getICPData() : async {price : Float; marketCap : Float; lastUpdated : Int} {
    return {
      price = price;
      marketCap = marketCap;
      lastUpdated = lastUpdated;
    };
  };

  public func updateICPData(newPrice : Float, newMarketCap : Float) : async () {
    price := newPrice;
    marketCap := newMarketCap;
    lastUpdated := Time.now();
  };

  public shared(msg) func vote(voteYes : Bool) : async () {
    if (voteYes) {
      yesVotes += 1;
    } else {
      noVotes += 1;
    };
    Debug.print("Vote recorded. Yes votes: " # Nat.toText(yesVotes) # ", No votes: " # Nat.toText(noVotes));
  };

  public query func getVotingResults() : async {yesVotes : Nat; noVotes : Nat} {
    return {
      yesVotes = yesVotes;
      noVotes = noVotes;
    };
  };

  // For demonstration purposes, we'll update the ICP data every hour
  system func timer(setTimer : Nat64 -> ()) : async () {
    // Simulate price and market cap changes
    let priceChange = Float.fromInt(Int.abs(Time.now() % 100)) / 100.0 - 0.5;
    price += priceChange;
    marketCap *= (1.0 + priceChange);
    lastUpdated := Time.now();
    Debug.print("ICP data updated. New price: " # Float.toText(price) # ", New market cap: " # Float.toText(marketCap));

    // Schedule the next update in 1 hour (3600000000000 nanoseconds)
    setTimer(3600000000000);
  };
}
