import {LovelaceCardConfig} from 'custom-card-helpers';

export interface CardConfig extends LovelaceCardConfig {
  title: string;
  element_id: string;
}
