<template>
    <div class="modal" v-if="show">
        <div class="modal--content">
            <div v-html="closeModal" class="modal--close" @click="OnCloseModalClick"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import feather from 'feather-icons'

export default {
    // eslint-disable-next-line
  name: "Modal",
  data() {
    return {};
  },
  props:{
    show: {
            type: Boolean,
            default: false,
        }
  },
  components: {},
  methods: {
    OnCloseModalClick(){
        this.$emit('modal-close')
    }
  },
  computed:{
    closeModal(){
        return feather.icons.x.toSvg()
    },
  }
};
</script>

<style lang="less" scoped>
    .modal{
        background: rgba(0,0,0,0.4);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &--close{
            cursor: pointer;
            width: fit-content;
            margin-left: auto;
        }

        &--content{
            background: white;
            width: 600px;
            padding: 30px;
            border-radius: 8px;
            position: absolute;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
        }

        @media @tablet {
            &--content{
                width: calc(100% - 20px);
                font-size: 12px;

            }
            }

    }

</style>
