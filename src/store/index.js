import Vue from 'vue'
import Vuex from 'vuex'

import axios from '../lib/axios'

import { setToken } from '../lib/localstorage';
import { getLastRoomTurn } from "../helpers/room";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: [],
    messages: [],
    activeRoom: null,
    user: null,
    selectedCard: null,
    selectedUserCard: null,
    selectedUser: null
  },
  mutations: {
    MESSAGES_SET(state, data) {
      state.messages = data
    },
    ACTIVE_ROOM_SET(state, data) {
      state.activeRoom = data
    },
    USER_SET(state, data) {
      state.user = data
    },
    SELECTED_CARD_SET(state, data) {
      state.selectedCard = data
    },
    SELECTED_USER_CARD_SET(state, data) {
      state.selectedUserCard = data
    },
    SELECTED_USER_SET(state, data) {
      state.selectedUser = data
    },
    MESSAGE_ADD(state, data) {
      state.messages.push(data)
    }
  },
  actions: {
    async ROOMS_FETCH() {
      const result = await axios.get('/rooms')
      return result
    },
    async ROOM_FETCH({ commit }, id) {
      const result = await axios.get(`/rooms/${id}`)
      commit('ACTIVE_ROOM_SET', result)
      commit('MESSAGES_SET', result.messages)
      return result
    },
    async ROOM_CREATE({ commit }, data) {
      commit('ACTIVE_ROOM_SET', null)
      commit('USER_SET', null)

      const result = await axios.post(`/rooms`, data)
      const { user, room } = result

      setToken(user.token)

      return room
    },
    async ROOM_JOIN({ commit }, data) {
      const { roomId, link } = data
      const result = await axios.post(`/rooms/${roomId || link}`, data)
      const { user, room } = result

      setToken(user.token)
      commit('ACTIVE_ROOM_SET', room)

      return room
    },
    async ROOM_START({ commit }, roomId) {
      const room = await axios.post(`/rooms/${roomId}/start`)
      commit('ACTIVE_ROOM_SET', room)

      return room
    },
    async ROOM_RESTART({ commit }, roomId) {
      const room = await axios.post(`/rooms/${roomId}/restart`)
      commit('ACTIVE_ROOM_SET', room)

      return room
    },
    async ROOM_DRAW({ commit }, data) {
      const { roomId } = data
      const room = await axios.post(`/rooms/${roomId}/draw`, data)
      commit('ACTIVE_ROOM_SET', room)
    },
    async USER_FETCH({ commit }) {
      const user = await axios.get(`/me`)
      commit('USER_SET', user)

      return user
    },
    async CARD_PLAY({ commit }, data) {
      const { roomId } = data
      const room = await axios.post(`/rooms/${roomId}/play`, data)
      cleanRoom(commit, room)
      commit('SELECTED_USER_CARD_SET', null)

      return room
    },
    async CARD_DRAW_BLOCKER({ commit }, data) {
      const { roomId, cardId } = data
      let url = `/rooms/${roomId}/drawLucky`
      if (cardId) url += `/${cardId}`
      const room = await axios.post(url)
      cleanRoom(commit, room)
      commit('SELECTED_USER_CARD_SET', null)

      return room
    },
    async CARD_REACT({ commit }, data) {
      const { roomId } = data
      const room = await axios.post(`/rooms/${roomId}/react`, data)
      cleanRoom(commit, room)

      return room
    },
    async CARD_UNLOADED_TAKE({ commit }, data) {
      const { roomId } = data
      const room = await axios.post(`/rooms/${roomId}/take`, data)
      cleanRoom(commit, room)

      return room
    },
    async USER_TURN_ACTION({ commit }, { roomId, actionId }) {
      let url = `/rooms/${roomId}/turn`
      if (actionId) url += `/${actionId}`
      const room = await axios.post(url)
      cleanRoom(commit, room)

      return room
    },
    async USER_DISCARD({ commit }, data) {
      const { roomId } = data
      await axios.post(`/rooms/${roomId}/discard`, data)
      cleanCards(commit)
    },
    async USER_LEAVE(_, roomId) {
      await axios.post(`/rooms/${roomId}/leave`)
    },
    async USER_KICK(_, data) {
      const { roomId, userId } = data
      const room = await axios.post(`/rooms/${roomId}/kick/${userId}`)

      return room
    },
    async MESSAGE_SUBMIT(_, data) {
      const message = await axios.post(`/chat`, data)

      return message
    }
  },
  getters: {
    rooms: (state) => state.rooms,
    activeRoom: (state) => state.activeRoom,
    lastTurn: (state) => {
      if (!state.activeRoom) return null
      return getLastRoomTurn(state.activeRoom)
    },
    lastAction: (state) => {
      if (!state.activeRoom) return null

      const lastTurn = getLastRoomTurn(state.activeRoom)
      if (!lastTurn) return null

      const { actions } = lastTurn
      if (!actions.length) return null

      return actions[actions.length - 1]
    },
    focusedUserId: (state) => {
      if (!state.activeRoom) return null
      const { turns } = state.activeRoom
      if (!turns.length) return null

      const turn = turns[turns.length - 1]
      const { actions } = turn
      if (!actions.length) return null;
      const lastAction = actions[actions.length - 1]
      return lastAction.focusedUserId
    },
    user: (state) => state.user,
    roomUser: (state) => {
      const room = state.activeRoom
      return room.users.find(u => u.id === state.user.id)
    },
    selectedCard: (state) => state.selectedCard,
    selectedUserCard: (state) => state.selectedUserCard,
    selectedUser: (state) => state.selectedUser,
    messages: (state) => state.messages
  },
  modules: {}
})

function cleanRoom(commit, room) {
  commit('SELECTED_CARD_SET', null)
  commit('SELECTED_USER_SET', null)
  commit('ACTIVE_ROOM_SET', room)
}

function cleanCards(commit) {
  commit('SELECTED_CARD_SET', null)
  commit('SELECTED_USER_SET', null)
  commit('SELECTED_USER_CARD_SET', null)
}