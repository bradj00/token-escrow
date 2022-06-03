import React from 'react'
import AccountTitle from './AccountTitle'
import CounterPartyAddressInput from './CounterPartyAddressInput'
import EscrowHistory from './EscrowHistory'

const HomePage = () => {
  return (
    <div>
        <AccountTitle />
        <CounterPartyAddressInput />
        <EscrowHistory />

    </div>
  )
}

export default HomePage