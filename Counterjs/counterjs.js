export const counterjsLogic = (obj) => {

    // console.log("js", obj)

    const metrics = obj.counter;

    function createCountUpInstance(options) {
        // console.log(options)
        return new countUp.CountUp(options.targetEl, options.number, { ...options });
    }

    metrics.forEach((metric) => {
        // console.log(metric)
        createCountUpInstance(metric);
    });
}