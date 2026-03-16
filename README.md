# Speed Distance Time Calculator

Solve for speed, distance, or time given the other two values, with unit conversion across km/h, mph, m/s, and knots, entirely in the browser.

**Live Demo:** https://file-converter-free.com/en/calculators/speed-calculator

## How It Works

The calculator operates in three modes selected via tabs. In speed mode, `speed = distance / time`. In distance mode, `distance = speed * time`. In time mode, `time = distance / speed`. All values are normalized to a common internal unit (km and km/h) before calculation using `toKm(value, unit)` and `fromKm(result, unit)` for distances, and `toKmh(value, unit)` and `fromKmh(result, unit)` for speeds. The conversion factors are: 1 mi = 1.60934 km, 1 m = 0.001 km, 1 knot = 1.852 km/h. Time is decomposed into hours and minutes for display using integer division and modulo.

## Features

- Three-mode tab panel: calculate speed, distance, or time
- Speed units: km/h, mph, m/s, knots
- Distance units: km, miles, metres
- Time input in hours and minutes
- Internal normalization via `toKm`/`fromKm` and `toKmh`/`fromKmh` converters

## Browser APIs Used

- (No external APIs — pure DOM arithmetic)

## Code Structure

| File | Description |
|------|-------------|
| `speed-calculator.js` | `toKm`/`fromKm` (distance unit converters), `toKmh`/`fromKmh` (speed unit converters), 3-mode tab click handler, h/m time decomposition |

## Usage

| Element ID / Selector | Purpose |
|----------------------|---------|
| `#spdcalc-tabs` | Mode tab buttons (speed/distance/time) |
| `#spdSpeed`, `#spdSpeedUnit` | Speed input and unit selector |
| `#spdDist`, `#spdDistUnit` | Distance input and unit selector |
| `#spdTimeH`, `#spdTimeM` | Time input in hours and minutes |
| `#spdCalc` | Calculate button |
| `#spdResult` | Calculated result display |

## License

MIT
