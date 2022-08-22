import { io } from 'socket.io-client';
import { serverUrl } from '@scripts/constants';

export const socket = io.connect(serverUrl);

export default socket;
