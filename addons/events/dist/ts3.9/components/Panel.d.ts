import { Component } from 'react';
import { API } from '@storybook/api';
import { Event as EventType, OnEmitEvent } from '../index';
interface EventsPanelProps {
    active: boolean;
    api: API;
}
interface EventsPanelState {
    events: EventType[];
}
export default class EventsPanel extends Component<EventsPanelProps, EventsPanelState> {
    state: EventsPanelState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onAdd: (events: EventType[]) => void;
    onEmit: (event: OnEmitEvent) => void;
    render(): JSX.Element;
}
export {};