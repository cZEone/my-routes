// Your routes. Edit this file to add/change routes.
//
// Leg types:
//   { walk: <min>, label }                       fixed walking time (Google Maps time)
//   { bus, from, fromName, to, toName, rideMin }  rideMin = fallback ride time (Google Maps)
//                                                 used only when the bus can't be tracked by GPS
//   { train: <label>, min }                       fixed minutes incl. walking to platform + wait
//
// TODO marks = placeholder numbers estimated from stop distances. Replace with Google Maps times.

window.CONFIG = {
  connectionMarginMin: 2, // ✅ if you reach the stop at least this many minutes before the bus
  destinations: [
    {
      name: "Orchard",
      routes: [
        {
          name: "298 → 129 → MRT",
          legs: [
            { walk: 5, label: "Home → Blk 871C" }, // TODO: your walk time from home
            { bus: "298", from: "75179", fromName: "Blk 871C", to: "75251", toName: "Opp Tropica Condo", rideMin: 5 }, // TODO
            { walk: 2, label: "Cross road → Tropica Condo" }, // TODO
            { bus: "129", from: "75259", fromName: "Tropica Condo", to: "52179", toName: "Braddell Stn", rideMin: 18 }, // TODO
            { walk: 2, label: "Walk to Braddell MRT" }, // TODO
            { train: "Braddell → Orchard (NS)", min: 13 }, // TODO: incl. wait + 4 stops
          ],
        },
        {
          name: "298 → 58 → 5",
          legs: [
            { walk: 5, label: "Home → Blk 871C" }, // TODO: your walk time from home
            { bus: "298", from: "75179", fromName: "Blk 871C", to: "75419", toName: "The Alps Residences", rideMin: 2 }, // TODO
            { bus: "58", from: "75419", fromName: "The Alps Residences", to: "84481", toName: "Aft Bedok Ind Pk C", rideMin: 7 }, // TODO
            { bus: "5", from: "84481", fromName: "Aft Bedok Ind Pk C", to: "09219", toName: "Far East Plaza", rideMin: 32 }, // TODO
          ],
        },
        {
          name: "298 → 518",
          legs: [
            { walk: 5, label: "Home → Blk 871C" }, // TODO: your walk time from home
            { bus: "298", from: "75179", fromName: "Blk 871C", to: "75251", toName: "Opp Tropica Condo", rideMin: 5 }, // TODO
            { walk: 2, label: "Cross road → Tropica Condo" }, // TODO
            { bus: "518", from: "75259", fromName: "Tropica Condo", to: "09047", toName: "Orchard Stn/Tang Plaza", rideMin: 28 }, // TODO
          ],
        },
        {
          name: "298 → 58 → 518",
          legs: [
            { walk: 5, label: "Home → Blk 871C" }, // TODO: your walk time from home
            { bus: "298", from: "75179", fromName: "Blk 871C", to: "75419", toName: "The Alps Residences", rideMin: 2 }, // TODO
            { bus: "58", from: "75419", fromName: "The Alps Residences", to: "72179", toName: "HomeTeamNS", rideMin: 5 }, // TODO
            { bus: "518", from: "72179", fromName: "HomeTeamNS", to: "09047", toName: "Orchard Stn/Tang Plaza", rideMin: 25 }, // TODO
          ],
        },
      ],
    },
  ],
};
