
export enum ElementTypes {
    Input,
    Button,
    View
}

export type AddElementEvent = {
    element:ElementTypes,
    key: string
}
