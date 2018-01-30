require('ui/modules').get('app/wazuh', [])
.service('patternHandler', function ($route, $window, genericReq, courier, appState, Notifier) {
    return {
        getPatternList: () => {
            let patternList = [];

            // Getting the index pattern list into the array,
            // but selecting only "valid" ones
            for (let i = 0; i < $route.current.locals.ips.list.length; i ++) {
                courier.indexPatterns.get($route.current.locals.ips.list[i].id)
                .then((data) => {
                    let minimum = ["@timestamp", "full_log", "manager.name", "agent.id"];
                    let minimumCount = 0;

                    for (let j = 0; j < data.fields.length; j++) {
                        if (minimum.includes(data.fields[j].name)) {
                            minimumCount++;
                        }
                    }

                    if (minimumCount == minimum.length) {
                        patternList.push($route.current.locals.ips.list[i]);
                    }
                });
            }

            return patternList;
        },
        changePattern: (selectedPattern) => {
            const notify = new Notifier({ location: 'Settings' });
            let newPattern = null;

            genericReq.request('GET', `/api/wazuh-elastic/updatePattern/${selectedPattern}`)
            .then((data) => {
                appState.setCurrentPattern(selectedPattern);

                newPattern = selectedPattern;
                $window.location.reload();
            })
            .catch(() => {
                notify.error("Error while changing the default index-pattern");
            });

            return newPattern;
        }
    };
});
