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

// Any of several buses between the same two stops: the app picks whichever gets you there first.
const anyBus = (nos, from, fromName, to, toName, rideMin) => ({
  options: nos.map(no => ({ name: no, legs: [{ bus: no, from, fromName, to, toName, rideMin }] })),
});
const walkTo75171 = { walk: 3, label: "Home → UWCSEA" }; // assumed: 71 m from 75179
const walkSimeiToCCSS = { walk: 8, label: "Simei Stn → Changkat Changi Sec" }; // TODO
const walk76081ToYMPS = { walk: 5, label: "Opp Holy Trinity Ch → Yumin Pri" }; // TODO
const walk76171ToYMPS = { walk: 3, label: "Blk 266 → Yumin Pri" }; // TODO

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
    {
      name: "CCSS",
      routes: [
        {
          name: "69 → MRT",
          legs: [
            walkTo75151,
            { bus: "69", from: "75151", fromName: "Opp Blk 871A", to: "75009", toName: "Tampines Int", rideMin: 7 }, // TODO
            { walk: 3, label: "Walk to Tampines MRT" }, // TODO
            { train: "Tampines → Simei (EW)", min: 6 }, // TODO: incl. wait, 1 stop
            walkSimeiToCCSS,
          ],
        },
        {
          name: "118 → 5",
          legs: [
            { walk: 3, label: "Home → Blk 874" }, // assumed same as 75151 (52 m apart)
            { bus: "118", from: "75159", fromName: "Blk 874", to: "96289", toName: "Changi General Hosp", rideMin: 9 }, // TODO
            { bus: "5", from: "96289", fromName: "Changi General Hosp", to: "96169", toName: "Simei Stn", rideMin: 3 }, // TODO
            walkSimeiToCCSS,
          ],
        },
      ],
    },
    {
      name: "YMPS",
      routes: [
        {
          name: "454 → 8/18/28/59",
          legs: [
            walkTo75179,
            { bus: "454", from: "75179", fromName: "Blk 871C", to: "75051", toName: "Tampines West Stn Exit B", rideMin: 8 }, // TODO
            anyBus(["8", "18", "28", "59"], "75051", "Tampines West Stn Exit B", "76081", "Opp Holy Trinity Ch", 4), // TODO
            walk76081ToYMPS,
          ],
        },
        {
          name: "298 → 8",
          legs: [
            walkTo75179,
            { bus: "298", from: "75179", fromName: "Blk 871C", to: "75251", toName: "Opp Tropica Condo", rideMin: 5 }, // TODO
            { bus: "8", from: "75251", fromName: "Opp Tropica Condo", to: "76081", toName: "Opp Holy Trinity Ch", rideMin: 9 }, // TODO
            walk76081ToYMPS,
          ],
        },
        {
          name: "34",
          legs: [
            walkTo75171,
            { bus: "34", from: "75171", fromName: "UWCSEA", to: "76081", toName: "Opp Holy Trinity Ch", rideMin: 10 }, // TODO
            walk76081ToYMPS,
          ],
        },
        {
          name: "34A → 20/292/39",
          legs: [
            walkTo75171,
            { bus: "34A", from: "75171", fromName: "UWCSEA", to: "76059", toName: "Opp Our Tampines Hub", rideMin: 6 }, // TODO
            anyBus(["20", "292", "39"], "76059", "Opp Our Tampines Hub", "76081", "Opp Holy Trinity Ch", 5), // TODO
            walk76081ToYMPS,
          ],
        },
        {
          name: "34A → 3",
          legs: [
            walkTo75171,
            { bus: "34A", from: "75171", fromName: "UWCSEA", to: "76059", toName: "Opp Our Tampines Hub", rideMin: 6 }, // TODO
            { bus: "3", from: "76059", fromName: "Opp Our Tampines Hub", to: "76171", toName: "Blk 266", rideMin: 7 }, // TODO
            walk76171ToYMPS,
          ],
        },
        {
          name: "454 → 3",
          legs: [
            walkTo75179,
            { bus: "454", from: "75179", fromName: "Blk 871C", to: "76141", toName: "Tampines Stn/Int", rideMin: 10 }, // TODO
            { bus: "3", from: "76141", fromName: "Tampines Stn/Int", to: "76171", toName: "Blk 266", rideMin: 4 }, // TODO
            walk76171ToYMPS,
          ],
        },
      ],
    },
  ],
};
