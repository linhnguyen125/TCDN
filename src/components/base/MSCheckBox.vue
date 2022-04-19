<template>
	<label :for="option.id" class="m-checkbox"
		>{{ option.label }}
		<input type="checkbox" :value="1" @change="$emit('update:customer', $event.target.value)" :id="option.id" :name="option.name" />
		<span class="m-check-border"></span>
		<span class="m-check-mark"></span>
	</label>
</template>

<script>
	export default {
		name: "MSCheckBox",
		props: {
			option: Object,
      customer: Number,
		},
	};
</script>

<style></style>
