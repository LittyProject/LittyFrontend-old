<template>
    <div id="page">
        <div id="smallscreen">
            <h4>Please use a device with a wider screen</h4>
        </div>
        <div id="frame">
            <Error :errorMessage="error"/>
            <div id="sidepanel">
                <div id="profile">
                    <div class="wrap">
                        <img id="profile-img" :src="user.avatarURL" :class="user.status" alt="" />
                        <p><b>{{ user.username }}#{{ user.tag }}</b></p>
                        <i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                        <div id="status-options">
                            <ul>
                                <li id="status-online" class="active"><span class="status-circle"></span> <p>Online</p></li>
                                <li id="status-away"><span class="status-circle"></span> <p>Away</p></li>
                                <li id="status-busy"><span class="status-circle"></span> <p>Busy</p></li>
                                <li id="status-offline"><span class="status-circle"></span> <p>Offline</p></li>
                            </ul>
                        </div>
                        <div id="expanded">
                            <label for="facebook"><i class="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
                            <input name="facebook" type="text" value="idk" />
                            <label for="twitter"><i class="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
                            <input name="twitter" type="text" value="MYY" />
                            <label for="instagram"><i class="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
                            <input name="instagram" type="text" value="BOYYYY" />
                        </div>
                    </div>
                </div>
                <div id="search">
                    <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
                    <input type="text" placeholder="Search user..." />
                </div>
                <div id="contacts">
                    <ul>
                        <li class="contact active">
                            <div class="wrap">
                                <span class="contact-status online"></span>
                                <img src="https://icons-for-free.com/iconfiles/png/512/avatar-1320568024619304547.png" alt="" />
                                <div class="meta">
                                    <p class="name">Chat</p>
                                    <p class="preview">Pre-Alpha Global Chat</p>
                                </div>
                            </div>
                        </li>
                        <li class="contact">
                            <div class="wrap">
                                <span class="contact-status online"></span>
                                <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" alt="" />
                                <div class="meta">
                                    <p class="name">User Online</p>
                                    <p class="preview">Just a text.</p>
                                </div>
                            </div>
                        </li>
                        <li class="contact">
                            <div class="wrap">
                                <span class="contact-status busy"></span>
                                <img src="https://icons-for-free.com/iconfiles/png/512/avatar-1320568024619304547.png" alt="" />
                                <div class="meta">
                                    <p class="name">User Busy</p>
                                    <p class="preview">Just a looooong loooong text like this</p>
                                </div>
                            </div>
                        </li>
                        <li class="contact">
                            <div class="wrap">
                                <span class="contact-status away"></span>
                                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" />
                                <div class="meta">
                                    <p class="name">User Away</p>
                                    <p class="preview">Away user? Hmm... Ineteresting</p>
                                </div>
                            </div>
                        </li>
                        <li class="contact">
                            <div class="wrap">
                                <span class="contact-status"></span>
                                <img src="https://icon-library.com/images/104337_avatar.svg.svg" alt="" />
                                <div class="meta">
                                    <p class="name">User Offline</p>
                                    <p class="preview"><span>You:</span> Text sent by you mate.</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact"><ion-icon name="person-add-outline"></ion-icon> <span>Add Friend</span></button>
                    <button id="settings"><ion-icon name="settings-outline"></ion-icon> <span>Settings</span></button>
                </div>
            </div>
            <div class="content">
                <div class="contact-profile">
                    <p class="title">Messages</p>
                </div>
                <div class="messages">
                    <ul>
                        <li class="sent">
                            <img src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" alt="" />
                            <p>This is default message.</p>
                        </li>
                    </ul>
                </div>
                <div class="message-input">
                    <div class="wrap">
                        <input type="text" placeholder="Type your message...">
                        <ion-icon name="document-attach" class="attachment"></ion-icon>
                        <button class="submit"><ion-icon name="send" class="paper-plane"></ion-icon></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Modal from '@/src/components/layout/Modal';
import { mapActions, mapGetters } from 'vuex';
import Error from '@/src/components/error/Error.vue';

export default {
    name: 'Dash',
    props: ['message'],
    components: {
        Modal: Modal,
        Error
    },
    data: function() {
        return {
            user: {},
            servers: null,
            servername: null,
            error: this.message,
        };
    },
    computed: {
        ...mapGetters(['getUserData', 'getServerData', 'getChannelData', 'getSocket']),
    },
    methods: {
        ...mapActions([])
    },
    created() {
        if (localStorage.getItem('token') && !!this.getUserData.email) {
            axios
                .get(`/api/users/@me`)
                .then(res => {
                    this.$store.dispatch('saveUserData', res.data);
                    this.$store.dispatch('toggleAuthState', true);
                    this.user = res.data;
                })
                .catch(err => err);
        } else {
            this.user = this.getUserData;
        }
        return;
    },
    mounted() {
        if (this.errorMessage) {
            setTimeout(() => {
                this.errorMessage = '';
            }, 2500);
        }
    }
};
</script>


<style lang="scss">
@import '@/src/assets/scss/views/chat.scss';
</style>