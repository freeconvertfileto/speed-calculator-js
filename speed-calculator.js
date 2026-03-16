(function() {
    var solveFor = 'speed';
    var distEl = document.getElementById('spdDist');
    var distUnitEl = document.getElementById('spdDistUnit');
    var hoursEl = document.getElementById('spdHours');
    var minsEl = document.getElementById('spdMins');
    var secsEl = document.getElementById('spdSecs');
    var speedEl = document.getElementById('spdSpeed');
    var speedUnitEl = document.getElementById('spdSpeedUnit');
    var resultEl = document.getElementById('spdResult');
    var convEl = document.getElementById('spdConversions');
    var distSection = document.getElementById('spdDistSection');
    var timeSection = document.getElementById('spdTimeSection');
    var speedSection = document.getElementById('spdSpeedSection');

    // Convert distance to km
    function toKm(val, unit) {
        if (unit === 'mi') return val * 1.60934;
        if (unit === 'm') return val / 1000;
        return val;
    }
    function fromKm(km, unit) {
        if (unit === 'mi') return km / 1.60934;
        if (unit === 'm') return km * 1000;
        return km;
    }
    // Convert speed to km/h
    function toKmh(val, unit) {
        if (unit === 'mph') return val * 1.60934;
        if (unit === 'ms') return val * 3.6;
        if (unit === 'knots') return val * 1.852;
        return val;
    }
    function fromKmh(kmh, unit) {
        if (unit === 'mph') return kmh / 1.60934;
        if (unit === 'ms') return kmh / 3.6;
        if (unit === 'knots') return kmh / 1.852;
        return kmh;
    }

    function updateSections() {
        distSection.classList.toggle('spdcalc-disabled', solveFor === 'distance');
        timeSection.classList.toggle('spdcalc-disabled', solveFor === 'time');
        speedSection.classList.toggle('spdcalc-disabled', solveFor === 'speed');
    }

    function calculate() {
        var dist = parseFloat(distEl.value) || 0;
        var distKm = toKm(dist, distUnitEl.value);
        var h = parseFloat(hoursEl.value) || 0;
        var m = parseFloat(minsEl.value) || 0;
        var s = parseFloat(secsEl.value) || 0;
        var timeH = h + m / 60 + s / 3600;
        var speed = parseFloat(speedEl.value) || 0;
        var speedKmh = toKmh(speed, speedUnitEl.value);

        if (solveFor === 'speed') {
            if (distKm <= 0 || timeH <= 0) { resultEl.textContent = '--'; convEl.innerHTML = ''; return; }
            var resKmh = distKm / timeH;
            resultEl.textContent = resKmh.toFixed(2) + ' km/h';
            convEl.innerHTML = '<span class="spdcalc-conv"><b>' + (resKmh / 1.60934).toFixed(2) + '</b> mph</span>'
                + '<span class="spdcalc-conv"><b>' + (resKmh / 3.6).toFixed(2) + '</b> m/s</span>'
                + '<span class="spdcalc-conv"><b>' + (resKmh / 1.852).toFixed(2) + '</b> knots</span>';
        } else if (solveFor === 'distance') {
            if (speedKmh <= 0 || timeH <= 0) { resultEl.textContent = '--'; convEl.innerHTML = ''; return; }
            var resKm = speedKmh * timeH;
            resultEl.textContent = resKm.toFixed(2) + ' km';
            convEl.innerHTML = '<span class="spdcalc-conv"><b>' + (resKm / 1.60934).toFixed(2) + '</b> miles</span>'
                + '<span class="spdcalc-conv"><b>' + (resKm * 1000).toFixed(0) + '</b> meters</span>';
        } else {
            if (distKm <= 0 || speedKmh <= 0) { resultEl.textContent = '--'; convEl.innerHTML = ''; return; }
            var resH = distKm / speedKmh;
            var rH = Math.floor(resH);
            var rM = Math.floor((resH - rH) * 60);
            var rS = Math.round(((resH - rH) * 60 - rM) * 60);
            resultEl.textContent = rH + 'h ' + rM + 'm ' + rS + 's';
            convEl.innerHTML = '<span class="spdcalc-conv"><b>' + resH.toFixed(4) + '</b> hours</span>'
                + '<span class="spdcalc-conv"><b>' + (resH * 60).toFixed(2) + '</b> minutes</span>';
        }
    }

    document.querySelector('.spdcalc-tabs').addEventListener('click', function(e) {
        var tab = e.target.closest('.spdcalc-tab');
        if (!tab) return;
        var tabs = this.querySelectorAll('.spdcalc-tab');
        for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('spdcalc-tab-active');
        tab.classList.add('spdcalc-tab-active');
        solveFor = tab.getAttribute('data-solve');
        updateSections();
        calculate();
    });

    [distEl, hoursEl, minsEl, secsEl, speedEl].forEach(function(el) { el.addEventListener('input', calculate); });
    [distUnitEl, speedUnitEl].forEach(function(el) { el.addEventListener('change', calculate); });
    updateSections();
})();
