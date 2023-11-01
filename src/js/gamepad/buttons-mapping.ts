// TODO: add mappings to the standard gamepad based on SDL mappings.
// Ref: https://github.com/gabomdq/SDL_GameControllerDB
// Ref: https://github.com/libsdl-org/SDL/blob/SDL2/src/joystick/SDL_gamecontrollerdb.h
// Ref: https://github.com/gabomdq/SDL_GameControllerDB/issues/175
// Ref: https://wiki.libsdl.org/SDL2/SDL_GameControllerButton
// Ref: https://wiki.libsdl.org/SDL2/SDL_GameControllerAxis
// Ref: https://dev.to/xtrp/a-complete-guide-to-the-html5-gamepad-api-2k
/**
 * SDL has 3 types of things: buttons, axes, and hats.
 * Buttons are normal and easy to map.
 * Axes are like joysticks and analog triggers.
 * Hats should be mapped to dpads. They are more tricky and require mapping of a hat reference (almost always 0) and a bit map to a direction in an 8 direction grid.
 */
