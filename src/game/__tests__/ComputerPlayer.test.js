import ComputerPlayer from '../ComputerPlayer';
import Player from '../Player';

describe('ComputerPlayer', () => {
  let player = Player();
  let computerPlayer = ComputerPlayer();

  beforeEach(() => {
    player = Player();
    computerPlayer = ComputerPlayer();
  });

  it('return false if attackResult === "miss"', () => {
    expect(computerPlayer.attack(player)).toBeFalsy();
  });
});
