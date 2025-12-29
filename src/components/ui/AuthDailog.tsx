import React from 'react'

interface AuthDailogProps {
    isOpen: boolean;
    onClose: () => void
}

const AuthDailog: React.FC<AuthDailogProps> = ({ isOpen, onClose }) => {
    return (
        <div>AuthDailog</div>
    )
}

export default AuthDailog