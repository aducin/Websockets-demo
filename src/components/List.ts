import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './list.html';
import { Scooter } from '../interfaces/interfaces';
import { BATTERY_CHARGED_PERCENT, BATTERY_UNLOADED_PERCENT } from '../constants/constants';

@WithRender
@Component
export default class List extends Vue {
    charged: number;
    unloaded: number;

    @Prop({ type: Boolean, default: false })
    initialised!: boolean;
    @Prop({ type: Array, required: true })
    scooters!: Scooter[];
    @Prop({ type: Function, required: true })
    handleClick!: (id: string) => void;

        constructor()
        {
            super();
            this.charged = BATTERY_CHARGED_PERCENT;
            this.unloaded = BATTERY_UNLOADED_PERCENT;
        }
}
