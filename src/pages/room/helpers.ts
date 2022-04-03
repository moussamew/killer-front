import { Player } from 'types';

export const updatePlayerList = (
  playerUpdated: Player,
  playerList: Player[],
): Player[] => {
  const playerIndex = playerList.findIndex(
    (player) => player.id === playerUpdated.id,
  );

  if (playerIndex === -1) {
    // Add new player to the list
    return [...playerList, playerUpdated];
  }

  if (!playerUpdated.roomCode) {
    // Remove the player from the list
    playerList.splice(playerIndex, 1);
  } else {
    // Update the player in the list
    playerList.splice(playerIndex, 1, playerUpdated);
  }

  return playerList;
};
