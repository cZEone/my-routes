// Your routes. Edit this file to add/change routes.
//
// Leg types:
//   { walk: <min>, label }                       fixed walking time (Google Maps time)
//   { bus, from, fromName, to, toName, rideMin }  rideMin = fallback ride time (Google Maps)
//                                                 used only when the bus can't be tracked by GPS
//   { train: <label>, min }                       fixed minutes incl. walking to platform + wait
//   { options: [ { name, legs: [...] }, ... ] }   alternatives; the app tries every combination
//                                                 and shows the fastest
//
// TODO marks = placeholder numbers estimated from stop distances. Replace with Google Maps times.

// Reusable pieces
const walkTo75179 = { walk: 3, label: "Home → Blk 871C" };
const walkTo75151 = { walk: 3, label: "Home → Opp Blk 871A" };
const toTheAlps = {
  options: [
    { name: "walk to The Alps", legs: [{ walk: 5, label: "Home → The Alps Residences" }] },
    {
      name: "298 to The Alps",
      legs: [
        walkTo75179,
        { bus: "298", from: "75179", fromName: "Blk 871C", to: "75419", toName: "The Alps Residences", rideMin: 2 }, // TODO
      ],
    },
  ],
};

window.CONFIG = {
  connectionMarginMin: 2, // ✅ if you reach the stop at least this many minutes before the bus
  destinations: [
    {
      name: "Orchard",
      routes: [
        {
          name: "298 → 129 → MRT",
          legs: [
            walkTo75179,
            { bus: "298", from: "75179", fromName: "Blk 871C", to: "75251", toName: "Opp Tropica Condo", rideMin: 5 }, // TODO
            { walk: 2, label: "Cross road → Tropica Condo" }, // TODO
            { bus: "129", from: "75259", fromName: "Tropica Condo", to: "52179", toName: "Braddell Stn", rideMin: 18 }, // TODO
            { walk: 2, label: "Walk to Braddell MRT" }, // TODO
            { train: "Braddell → Orchard (NS)", min: 13 }, // TODO: incl. wait + 4 stops
          ],
        },
        {
          name: "58 → 5",
          legs: [
            toTheAlps,
            { bus: "58", from: "75419", fromName: "The Alps Residences", to: "84481", toName: "Aft Bedok Ind Pk C", rideMin: 7 }, // TODO
            { bus: "5", from: "84481", fromName: "Aft Bedok Ind Pk C", to: "09219", toName: "Far East Plaza", rideMin: 32 }, // TODO
          ],
        },
        {
          name: "298 → 518",
          legs: [
            walkTo75179,
            { bus: "298", from: "75179", fromName: "Blk 871C", to: "75251", toName: "Opp Tropica Condo", rideMin: 5 }, // TODO
            { walk: 2, label: "Cross road → Tropica Condo" }, // TODO
            { bus: "518", from: "75259", fromName: "Tropica Condo", to: "09047", toName: "Orchard Stn/Tang Plaza", rideMin: 28 }, // TODO
          ],
        },
        {
          name: "58 → 518",
          legs: [
            toTheAlps,
            { bus: "58", from: "75419", fromName: "The Alps Residences", to: "72179", toName: "HomeTeamNS", rideMin: 5 }, // TODO
            { bus: "518", from: "72179", fromName: "HomeTeamNS", to: "09047", toName: "Orchard Stn/Tang Plaza", rideMin: 25 }, // TODO
          ],
        },
        {
          name: "69 → MRT",
          legs: [
            walkTo75151,
            { bus: "69", from: "75151", fromName: "Opp Blk 871A", to: "75009", toName: "Tampines Int", rideMin: 7 }, // TODO
            { walk: 3, label: "Walk to Tampines MRT" }, // TODO
            { train: "Tampines → Orchard", min: 40 }, // TODO: incl. wait + change at City Hall
          ],
        },
      ],
    },
    {
      name: "Home",
      routes: [
        {
          name: "69",
          legs: [
            { walk: 2, label: "Bedok Reservoir MRT → Exit A stop" }, // TODO
            { bus: "69", from: "84201", fromName: "Bedok Resvr Stn Exit A", to: "75151", toName: "Opp Blk 871A", rideMin: 9 }, // TODO
            { walk: 3, label: "Opp Blk 871A → Home" },
          ],
        },
        {
          name: "46 → 293/298",
          legs: [
            { walk: 2, label: "Bedok Reservoir MRT → Exit A stop" }, // TODO
            { bus: "46", from: "84201", fromName: "Bedok Resvr Stn Exit A", to: "75089", toName: "Blk 827", rideMin: 7 }, // TODO
            {
              // 293 doesn't stop at 75179, and 298 reaches 75151 first, so both alight at 75151.
              options: [
                { name: "293", legs: [{ bus: "293", from: "75089", fromName: "Blk 827", to: "75151", toName: "Opp Blk 871A", rideMin: 3 }] }, // TODO
                { name: "298", legs: [{ bus: "298", from: "75089", fromName: "Blk 827", to: "75151", toName: "Opp Blk 871A", rideMin: 3 }] }, // TODO
              ],
            },
            { walk: 3, label: "Opp Blk 871A → Home" },
          ],
        },
        {
          name: "DTL → 293/69",
          legs: [
            { train: "Bedok Reservoir → Tampines (DTL)", min: 4 }, // TODO: 2 stops, already on train
            { walk: 5, label: "Tampines DTL → Tampines Int" }, // TODO
            {
              options: [
                {
                  name: "293",
                  legs: [
                    { bus: "293", from: "75009", fromName: "Tampines Int", to: "75151", toName: "Opp Blk 871A", rideMin: 8 }, // TODO
                    { walk: 3, label: "Opp Blk 871A → Home" },
                  ],
                },
                {
                  name: "69",
                  legs: [
                    { bus: "69", from: "75009", fromName: "Tampines Int", to: "75159", toName: "Blk 874", rideMin: 6 }, // TODO
                    { walk: 3, label: "Blk 874 → Home" }, // assumed same as 75151 (52 m apart)
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
