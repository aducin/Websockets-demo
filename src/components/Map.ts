import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './templates/map.html';

@WithRender
@Component
export default class Map extends Vue {

    @Prop({ type: Function, required: true })
    setMap!: () => void;

    mounted () {
        this.setMap();
    }
}
