import { useState } from "react";
import { HeroFeatureSection } from "./components/HeroFeatureSection/HeroFeatureSection";
import { OrbitSection } from "./components/OrbitSection/OrbitSection";
import { FinalSection } from "./components/FinalSection/FinalSection";
import Footer from "./components/Footer";
import { WalletConnectModal } from "./components/common/Modals/WalletConnectModal";
import { SwapModal } from "./components/common/Modals/SwapModal";
import { SecurityAuditModal } from "./components/common/Modals/SecurityAuditModal";
import { DAppBrowserModal } from "./components/common/Modals/DAppBrowserModal";
import { ToastNotification } from "./components/common/ToastNotification";

function App() {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [swapModalOpen, setSwapModalOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [dappsModalOpen, setDappsModalOpen] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleConnectWallet = (name: string, address: string) => {
    setConnectedAddress(address);
    showToast(`Connected to ${name} (${address})`);
  };

  return (
    <div>
      <main>
        <HeroFeatureSection
          onOpenWalletModal={() => setWalletModalOpen(true)}
          connectedAddress={connectedAddress}
          onOpenSwapModal={() => setSwapModalOpen(true)}
          onOpenAuditModal={() => setAuditModalOpen(true)}
          onOpenDAppsModal={() => setDappsModalOpen(true)}
        />
        <OrbitSection />
        <FinalSection
          onOpenSwapModal={() => setSwapModalOpen(true)}
          onOpenAuditModal={() => setAuditModalOpen(true)}
          onOpenDAppsModal={() => setDappsModalOpen(true)}
        />
      </main>

      <Footer onSubscribe={(email) => showToast(`Subscribed ${email} to CryptoWave Alpha`)} />

      {/* Interactive Modals */}
      <WalletConnectModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnect={handleConnectWallet}
      />

      <SwapModal
        isOpen={swapModalOpen}
        onClose={() => setSwapModalOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      <SecurityAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

      <DAppBrowserModal
        isOpen={dappsModalOpen}
        onClose={() => setDappsModalOpen(false)}
        onLaunch={(name) => showToast(`Launched ${name} in Sandbox`)}
      />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

export default App;