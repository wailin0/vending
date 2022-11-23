import React, {useContext, useEffect} from 'react';
import storage from '../utils/storage';
import {Context} from '../components/Context';


const LogoutDevice = () => {
    const {setHasKey} = useContext(Context);

    useEffect(() => {
        storage.clearItem().then(() => setHasKey(false));
    }, []);

    return (
        <>
        </>
    );
};

export default LogoutDevice;
