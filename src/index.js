/* @flow */
type EventPoolOptions = {
  /* Name(s) of events to listen to */
  events: Array<string> | string,

  /* Function to call once timeout is reached */
  callback: (pool: Array<mixed>, event: CustomEvent | Event) => void,

  /* Timeout (ms) before the callback / next aggregation */
  timeout: number,

  /* Enable prolonging the timeout by its value once the next event is caught */
  aggregate: boolean
}

/* Default options */
const defaultOptions: EventPoolOptions = {
  events: '',
  callback: pool => console.log('Accumulated pool:', pool),
  timeout: 20,
  aggregate: false
};

const EventPool = (options: EventPoolOptions) => {
  /* Combine and destruct the options */
  const { events, timeout, callback, aggregate } = { ...defaultOptions, ...options };

  /* Ensure event names are always in an Array */
  const eventsList: Array<string> = Array.isArray(events) ? events : [events];

  /* Declare internal state variables */
  let pool: Array<any> = [];
  let runningTimeout: number = 0;

  /* Loop through each event name and attach a proper event listener to it */
  eventsList.forEach(eventName => document.addEventListener(eventName, (event: CustomEvent | Event) => {
    /* Aggregate custom event details or general event instances */
    pool.push((event instanceof CustomEvent) ? event.detail : event);

    /* Determine whether should set a timeout */
    const shouldSetTimeout: boolean = (aggregate || !runningTimeout);

    /* Clear perviously running timeout in aggregate mode */
    if (aggregate) clearTimeout(runningTimeout);

    if (shouldSetTimeout) {
      /* Set the timeout to execute a callback function after it is reached */
      runningTimeout = setTimeout(() => {
        callback(pool, event);

        /* Reset the inner state for the further accumulation */
        pool = [];
        runningTimeout = 0;
      }, timeout);
    }
  }, false));
};

export default EventPool;
