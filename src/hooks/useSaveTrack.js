import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
    const { createTrack } = useContext(TrackContext);
    const { state: { locations, name }, reset } = useContext(LocationContext);

    const saveTrack = async () => {
        await createTrack(name, locations);

        // resetting the form then navigate user to screen with list of tracks recorded
        reset();
        navigate('TrackList');
    };

    return [saveTrack];
};