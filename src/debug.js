(function (w) {
  // ml debug functions
  const d = w._ml_debug || [];
  w.ML_DEBUG = {
    config: d.config,
    report(section, keyword) {
      // report on section, when keyword exists, show only things related to keyword
      if (!d[section]) return;
      for (let index in d[section]) {
        // if keyword exists, show only those with the keyword...
        let tmp = Object.create(d[section][index]);
        let indexIsDisplayed = false;
        tmp.map(function (tmpItem) {
          let val = tmpItem;
          // force array to make it easier
          if (!Array.isArray(val)) {
            val = [val];
          }
          if (keyword) {
            let valSelected = [];
            // search
            val.map(function (item) {
              keyword = keyword.toLowerCase();
              try {
                if (index.toLowerCase().indexOf(keyword) >= 0) {
                  valSelected.push(item);
                }
                if (item.toLowerCase().indexOf(keyword) >= 0) {
                  valSelected.push(item);
                }
              } catch (e) {
              }
            });
            val = valSelected;
          }

          if (val.length > 0) {
            if (!indexIsDisplayed) {
              console.group(index);
              indexIsDisplayed = true;
            }
            val.map(function (item) {
              console.log(item);
            });
          }
        });
        if (indexIsDisplayed) {
          console.groupEnd();
        }
      }
    },
    summary(name) {
      this.report('summary', name);
    },
    file(name) {
      this.report('files', name);
    },
    template(name) {
      if (!name) name = 'tpl.';
      this.report('files', name);
    },
    benchmark(key) {
      // can't use normal report, as benchmark stores objects
      var b = d.benchmark;
      if (!b) return;

      // now find each bench
      for (let index in b) {
        if (key) {
          if (index.indexOf(key) < 0) {
            continue;
          }
        }
        let val = b[index];
        console.group(index);
        val.map(function (item) {
          console.log(`${item.context} is processed in ${item.time} ms, \nsrc: ${item.trace}`);
        });
        console.groupEnd();
      }
    },
    dump() {
      this.report('dump');
    },
    error(type) {
      // report on certain type only when required
      this.report('error', type);
    }
  };
})(this);
