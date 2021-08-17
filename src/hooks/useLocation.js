import { useState, useEffect } from "react";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

export default (callback) => {

    const [err, setErr] = useState(null);

    const startWatching = async () => {
        try {
            await requestForegroundPermissionsAsync();
            await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            },
                // Gets invoked every single time the user changes its location
                callback
            )
        } catch (e) {
            setErr(e);
        }
    }

    useEffect(() => {
        startWatching();
    }, []);

    return [err];
}