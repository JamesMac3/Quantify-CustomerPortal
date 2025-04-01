// src/verificationState.js
import { useState } from 'react';

export const useVerificationState = () => {
  const [walletRequested, setWalletRequested] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);
  const [bankLinked, setBankLinked] = useState(false);
  const [requestCompleted, setRequestCompleted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [ssn, setSsn] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [bankCards, setBankCards] = useState([{ nickname: '', routingNumber: '', accountNumber: '' }]);

  const handleRequestWallet = () => {
    setWalletRequested(true);
  };

  const handleKycVerification = () => {
    setKycVerified(true);
  };

  const handleBankLink = () => {
    setBankLinked(true);
  };

  const handleCompleteRequest = () => {
    setRequestCompleted(true);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prevFiles => [...prevFiles, ...files]);
  };

  const handleBankInputChange = (index, field, value) => {
    const newBankCards = [...bankCards];
    newBankCards[index][field] = value;
    setBankCards(newBankCards);
  };

  const handleAddBankCard = () => {
    if (bankCards.length < 3) {
      setBankCards([...bankCards, { nickname: '', routingNumber: '', accountNumber: '' }]);
    }
  };

  const handleGoBack = () => {
    setWalletRequested(false);
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setBirthdate('');
    setSsn('');
    setUploadedFiles([]);
    setKycVerified(false);
    setBankLinked(false);
    setBankCards([{ nickname: '', routingNumber: '', accountNumber: '' }]);
    setRequestCompleted(false);
  };

  const handleResetKYC = () => {
    setKycVerified(false);
    setSsn('');
    setUploadedFiles([]);
    setBankLinked(false);
    setRequestCompleted(false);
  };

  const handleResetBankLink = () => {
    setBankLinked(false);
    setBankCards([{ nickname: '', routingNumber: '', accountNumber: '' }]);
    setRequestCompleted(false);
  };

  return {
    walletRequested,
    kycVerified,
    bankLinked,
    requestCompleted,
    fullName,
    phoneNumber,
    email,
    birthdate,
    ssn,
    uploadedFiles,
    bankCards,
    setFullName,
    setPhoneNumber,
    setEmail,
    setBirthdate,
    setSsn,
    setUploadedFiles,
    handleRequestWallet,
    handleKycVerification,
    handleBankLink,
    handleCompleteRequest,
    handleFileUpload,
    handleBankInputChange,
    handleAddBankCard,
    handleGoBack,
    handleResetKYC,
    handleResetBankLink,
  };
};
