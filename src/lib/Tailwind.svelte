<script>
    import { createEventDispatcher } from 'svelte';
  
    export let label = '';
  
    const dispatch = createEventDispatcher();
     /**
     * Button click handler
     */
     function onClick(event) {
      dispatch('click', event);
    }
  </script>
  
  <button
  class="bg-red-500"
    on:click={onClick}>
    {label}
  </button>