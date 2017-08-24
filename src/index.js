/* @flow */
type TEventsPoolOptions = {
  /* Name(s) of events to listen to */
  events: Array<string> | string,

  /* Even target to dispatch expected event(s) */
  eventTarget: EventTarget,

  /* Timeout (ms) before the callback / next aggregation */
  timeout: number,

  /* Function to call once timeout is reached */
  callback: (pool: Array<CustomEvent | Event>, data: Array<mixed>) => mixed,

  /* Enable prolonging the timeout by its value once the next event is caught */
  aggregate: boolean
}

/* Default options */
const defaultOptions: TEventsPoolOptions = {
  events: '',
  eventTarget: document,
  timeout: 20,
  callback: (pool, data) => ({ pool, data }),
  aggregate: false
};

const EventsPool = (options: TEventsPoolOptions) => {
  /* Combine and destruct the options */
  const { events, eventTarget, timeout, callback, aggregate } = { ...defaultOptions, ...options };

  /* Ensure event names are always in an Array */
  const eventsList: Array<string> = Array.isArray(events) ? events : [events];

  /* Declare internal state variables */
  let pool: Array<any> = [];
  let runningTimeout: number = 0;

  /* Loop through each event name and attach a proper event listener to it */
  eventsList.forEach((eventName: string) => {
    eventTarget.addEventListener(eventName, (event: CustomEvent | Event) => {
      /* Aggregate custom event details or general event instances */
      pool.push(event);

      /* Determine whether should set a timeout */
      const shouldSetTimeout: boolean = (aggregate || !runningTimeout);

      /* Clear perviously running timeout in aggregation mode */
      if (aggregate) clearTimeout(runningTimeout);

      if (shouldSetTimeout) {
        /* Set the timeout to execute a callback function after it is reached */
        runningTimeout = setTimeout(() => {
          /* Accumulate the data from all caught CustomEvents */
          const data = pool.reduce((data, { detail }) => {
            return (detail || detail === false) ? data.concat(detail) : data;
          }, []);

          /* Invoke the callback */
          callback(pool, data);

          /* Reset the inner state for the further accumulation */
          pool = [];
          runningTimeout = 0;
        }, timeout);
      }
    }, false);
  });

  return this;
};

export default EventsPool;
