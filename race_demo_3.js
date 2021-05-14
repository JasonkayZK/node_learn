function timeout(delay) {
    let cancel;
    const wait = new Promise(resolve => {
        const timer = setTimeout(() => resolve(false), delay);
        cancel = () => {
            clearTimeout(timer);
            resolve(true);
        };
    });
    wait.cancel = cancel;
    return wait;
}

function doWork() {
    const workFactor = Math.floor(600 * Math.random());
    const work = timeout(workFactor);

    const result = work.then(canceled => {
        if (canceled)
            console.log('Work canceled');
        else
            console.log('Work done in', workFactor, 'ms');
        return !canceled;
    });
    result.cancel = work.cancel;
    return result;
}

function attemptWork() {
    const work = doWork();
    return Promise.race([work, timeout(300)])
        .then(done => {
            if (!done)
                work.cancel();
            return (done ? 'Work complete!' : 'I gave up');
        });
}

attemptWork().then(console.log);
