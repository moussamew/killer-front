import { Player } from 'types';

export const updatePlayerList = (
  playerUpdated: Player,
  playerList: Player[],
): Player[] => {
  const playerIndex = playerList.findIndex(
    (player) => player.id === playerUpdated.id,
  );

  // Add new player to the list
  if (playerIndex === -1) {
    return [...playerList, playerUpdated];
  }

  // Remove the player from the list
  if (!playerUpdated.roomCode) {
    playerList.splice(playerIndex, 1);

    return playerList;
  }

  // Otherwise: Update the player in the list
  playerList.splice(playerIndex, 1, playerUpdated);

  return playerList;
};
