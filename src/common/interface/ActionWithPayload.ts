import { Action } from '@reduxjs/toolkit'

export interface ActionWithPayload<T> extends Action{
    payload?: T
}