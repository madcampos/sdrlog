<template>
	<button
		ref="button"
		type="button"
		:disabled="disabled"
	>
		<span id="button-icon">{{ icon }}</span>
		<span id="button-text">
			<slot></slot>
		</span>
	</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
	/** Make the button disabled */
	disabled: boolean,
	/** Icon to display in the button */
	icon: string
}>();

const button = ref<HTMLElement>();

function focus() {
	button.value?.focus();
}

defineExpose<{
	diabled?: boolean,
	icon?: string,
	focus(): void
}>({ focus });
</script>

<style>
	button {
		background: transparent;
		border: solid var(--border-width) transparent;
		border-radius: var(--border-radius);
		min-width: var(--button-size);
		width: fit-content;
		height: var(--button-size);
		padding: var(--padding-block) var(--padding-inline);
		margin: var(--margin-small);

		transition: var(--transition);

		font: inherit;

		user-select: none;
		app-region: no-drag;
		-webkit-app-region: no-drag;
	}

	button:focus {
		border-color: var(--accent-color);
		outline: none;
	}

	button:active {
		background: var(--secondary-color);
	}

	button:hover {
		background: var(--accent-color);
	}

	button:disabled {
		background: var(--dark-bg-color);
		color: var(--border-color);
	}

	:host([icon-button]) button {
		width: var(--button-size);
		padding: var(--padding-small);
	}

	:host([small]) button {
		min-width: unset;
		width: calc(var(--button-size) * 0.65);
		height: calc(var(--button-size) * 0.65);
		font-size: var(--small-text);
	}

	:host([wide]) button {
		min-width: min-content;
		width: 100%;
		text-align: left;
	}
</style>
