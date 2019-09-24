<template>
    <div class="row">
        <div class="col-6">
            <div class="row">
                <div class="col">
                    <h1>Members</h1>
                </div>
            </div>
            <ul>
                <li v-for="member in $store.state.members">
                    <router-link :to="`/member/${member['Member Id']}`">{{ member['Display Name'] }}</router-link>
                </li>
            </ul>
        </div>
        <div class="col-6">
            <h1>Sign in</h1>
            <h3 v-if="$store.state.signIn[0]">Hello {{ $store.state.signIn[0]['Display Name'] }}</h3>
            <pre>{{ JSON.stringify($store.state.signIn[0],null,2) }}</pre>
            <h2>Last 5 sign ins</h2>
            <ul>
                <li v-for="user in $store.state.signIn.slice(0,5)">
                    {{ user['Display Name'] }} ({{ user['User'] }})
                </li>
            </ul>
        </div>
    </div>
</template>
