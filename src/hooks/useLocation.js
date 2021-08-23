import { useState, useEffect } from "react";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    let subscriber;

    useEffect(() => {
        const startWatching = async () => {
            try {
                const { granted } = await requestForegroundPermissionsAsync();

                const subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                },
                    // Gets invoked every single time the user changes its location
                    callback
                );
                if (!granted) {
                    throw new Error('Location permission not granted')
                }
            } catch (e) {
                setErr(e);
            }
        }

        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber) {
                // Stops listening to changes in users location
                subscriber.remove();
            }
            subscriber = null;

            // Making sure that we stop listening for changes to the users location before we start listening a second time for changes; Stop listening to changes in users location before listening to it again
            return () => {
                if (subscriber) {
                    subscriber.remove();
                }
            };
        }
    }, [shouldTrack, callback, subscriber]);

    return [err];
}