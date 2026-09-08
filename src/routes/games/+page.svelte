<script>
  let { data } = $props()
</script>

<svelte:head>{@html data.head}</svelte:head>
{@html data.body}
