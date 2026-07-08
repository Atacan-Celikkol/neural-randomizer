/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageType = 'en' | 'tr';

export const translations = {
  en: {
    // Header & Global
    title: 'Synaptic Entropy Core',
    tagline: 'Harness bio-tech precision to eliminate decision fatigue instantly.',
    sysStatus: 'SYS',
    statusNominal: 'NOMINAL',
    statusCalibrating: 'CALIBRATING',
    statusDeciding: 'DECIDING',
    statusCompleted: 'COMPLETED',
    toggleTheme: 'Toggle Theme',
    toggleLanguage: 'Change Language',
    privacy: 'Privacy',
    terms: 'Terms',
    support: 'Support',
    copyright: 'Peloka Decision. Professional Randomization.',

    // Tabs
    listPicker: 'List Picker',
    range: 'Range',
    quickDecide: 'Quick Decide',

    // List Picker Tab
    addItemsLabel: 'Add Items (Separated by Comma or Enter)',
    itemsQueued: 'items queued',
    placeholderList: 'Enter option... Press enter or use comma to add options.',
    proTip: '💡 Pro tip: Paste a long list or type options separated by commas, then press decide!',
    presetsLabel: 'Presets:',
    memoryRegistry: 'Memory Registry',
    clear: 'Clear',
    weight: 'Weight',
    synapticWeighting: 'Enable synaptic weighting (weights 1-10)',
    entropyLevel: 'Entropy level',
    decideButton: 'Decide!',

    // Range Tab
    minLimit: 'Min Limit',
    maxLimit: 'Max Limit',
    synapticThreshold: 'SYNAPTIC THRESHOLD ADJUSTMENT',
    vectorDimensions: 'Vector Dimensions (Quantity)',
    outputsToGenerate: 'Number of outputs to generate',
    synapticPrecision: 'Synaptic Precision (Floating)',
    generateFloat: 'Generate float decimals (3 digits)',
    floatLabel: 'Float (1.000)',
    integerLabel: 'Integer (1)',
    allowOverlap: 'Allow Synaptic Overlap',
    allowDuplicates: 'Allow duplicate values in results',
    shortcuts: 'Shortcuts:',
    decideRangeButton: 'Decide Range!',

    // Quick Decide Tab
    oracleTitle: 'Oracle',
    oracleDesc: 'Solve simple questions instantly',
    askOracle: 'Ask Oracle',
    headsTailsTitle: 'Heads or Tails',
    headsTailsDesc: 'Synaptic physical rotation simulation',
    flipCoin: 'Flip Coin',
    customBinaryTitle: 'Custom Binary Confrontation (A vs B)',
    nodeAlpha: 'Node Alpha',
    nodeBeta: 'Node Beta',
    collideNodes: 'Collide Nodes',

    // Outcome Panel
    outcomeNode: 'OUTCOME NODE',
    calibrated: 'CALIBRATED',
    resolvingSynapses: 'Resolving Synapses...',
    entropyMatching: 'Entropy matching active',
    resolvedOutput: 'Resolved Output',
    copy: 'Copy',
    copied: 'Copied!',
    decideAgain: 'Decide Again',
    awaitingSignal: 'Awaiting Signal...',
    awaitingSignalDesc: 'Load parameters and click decide to activate synaptic network paths.',
    neuralLog: 'NEURAL LOG',
    flushBuffer: 'FLUSH BUFFER',

    // Logs & Calculations
    logInitCore: 'Neural Randomizer Core initialized.',
    logInitCalib: 'Calibrating organic synaptic connections... Stable.',
    logInitReady: 'System ready.',
    logFlush: 'Log buffer cleared manually by operator.',
    logCognitive: 'Initiating cognitive decision pathways...',
    logMapping: 'Mapping state vectors and loading quantum entropy coefficients...',
    logEvaluating: 'Evaluating decision topology under noise constraints...',
    logOutcomeResolved: 'Synaptic outcome resolved:',
    logDecideAborted: 'Decide process aborted:',
    logBufferUpdated: 'Buffer updated: added {count} option vectors. Current buffer: {total}',
    logVectorRemoved: 'Vector removed at index {index}. Remainder: {total}',
    logCleared: 'Memory buffer cleared completely.',
    logLoadedPreset: 'Loaded preset cluster: "{name}" ({count} variables)',
    logValidationErrorRange: 'Validation failure: Min threshold must be less than Max threshold.',
    logValidationErrorCount: 'Validation failure: Output generation count must be between 1 and 100.',
    logValidationErrorBinary: 'Validation failure: Both binary nodes must possess labels.',
    logValidationSpace: 'Insufficient space for non-overlapping integer range.',
    logReDecide: 'Initiating re-calibration re-decide cycle.',
    logCopied: 'Synaptic signature copied to clipboard: "{val}"',
    logPresetRange: 'Loaded range shortcut: {min} to {max} ({count} outputs)',
    logOracleQuery: 'Executing oracle query: YES/NO synaptic probability model...',
    logCoinFlipQuery: 'Executing coin-flip query: Binary gravitational spin model...',
    logCustomBinaryCollision: 'Executing custom binary collision: "{choiceA}" vs "{choiceB}"...',

    // Additional info details
    infoWeighted: 'Weighted Node choice. Synaptic probability: {probability}% (Weight {weight}/{total})',
    infoUniform: 'Uniform Node choice. Synaptic probability: {probability}%',
    infoRangeSweep: 'Bounded Range Sweep: [{min} to {max}]. Resolved dimensions: {count}.',
    infoHeads: 'Gravitational rotation resolved to Node Top.',
    infoTails: 'Gravitational rotation resolved to Node Bottom.',
    infoBinaryWon: 'Binary Node collision completed. "{winner}" defeated "{loser}".',

    yesnoValues: {
      YES: { value: 'YES', info: 'Cognitive coherence matches active alignment parameters (87% confidence).' },
      NO: { value: 'NO', info: 'Synaptic signal disruption detected. Path rejected (91% safety index).' },
      ABSOLUTELY: { value: 'ABSOLUTELY', info: 'Optimum path vector. Unanimous positive outcome probability.' },
      UNLIKELY: { value: 'UNLIKELY', info: 'High-entropy feedback loop. Negative tendency recommended.' },
      RECALIBRATE: { value: 'RECALIBRATE', info: 'Decision matrix suspended at neutral balance. Re-sweep recommended.' }
    },
    coinValues: {
      HEADS: { value: 'HEADS', info: 'Gravitational rotation resolved to Node Top.' },
      TAILS: { value: 'TAILS', info: 'Gravitational rotation resolved to Node Bottom.' }
    }
  },
  tr: {
    // Header & Global
    title: 'Sinaptik Entropi Çekirdeği',
    tagline: 'Karar yorgunluğunu anında ortadan kaldırmak için biyo-teknolojik hassasiyetten yararlanın.',
    sysStatus: 'SYS',
    statusNominal: 'NOMİNAL',
    statusCalibrating: 'KALİBRE EDİLİYOR',
    statusDeciding: 'KARAR VERİLİYOR',
    statusCompleted: 'TAMAMLANDI',
    toggleTheme: 'Temayı Değiştir',
    toggleLanguage: 'Dili Değiştir',
    privacy: 'Gizlilik',
    terms: 'Koşullar',
    support: 'Destek',
    copyright: 'Peloka Decision. Professional Randomization.',

    // Tabs
    listPicker: 'Liste Seçici',
    range: 'Aralık',
    quickDecide: 'Hızlı Karar',

    // List Picker Tab
    addItemsLabel: 'Öğeleri Ekle (Virgül veya Enter ile ayırın)',
    itemsQueued: 'öğe sıraya alındı',
    placeholderList: 'Seçenek girin... Eklemek için enter tuşuna basın veya virgül kullanın.',
    proTip: '💡 İpucu: Uzun bir listeyi yapıştırın veya seçenekleri virgülle ayırarak yazın, ardından karar ver butonuna basın!',
    presetsLabel: 'Hazır Şablonlar:',
    memoryRegistry: 'Bellek Kaydı',
    clear: 'Temizle',
    weight: 'Ağırlık',
    synapticWeighting: 'Sinaptik ağırlıklandırmayı etkinleştir (ağırlıklar 1-10)',
    entropyLevel: 'Entropi seviyesi',
    decideButton: 'Karar Ver!',

    // Range Tab
    minLimit: 'Min Sınır',
    maxLimit: 'Max Sınır',
    synapticThreshold: 'SİNAPTİK EŞİK AYARLAMASI',
    vectorDimensions: 'Vektör Boyutları (Miktar)',
    outputsToGenerate: 'Üretilecek çıktı sayısı',
    synapticPrecision: 'Sinaptik Hassasiyet (Ondalık)',
    generateFloat: 'Ondalık sayılar üret (3 basamaklı)',
    floatLabel: 'Ondalık (1.000)',
    integerLabel: 'Tam Sayı (1)',
    allowOverlap: 'Sinaptik Çakışmaya İzin Ver',
    allowDuplicates: 'Sonuçlarda yinelenen değerlere izin ver',
    shortcuts: 'Kısayollar:',
    decideRangeButton: 'Aralık Kararı Ver!',

    // Quick Decide Tab
    oracleTitle: 'Kehanet',
    oracleDesc: 'Basit soruları anında çözün',
    askOracle: 'Kahine Sor',
    headsTailsTitle: 'Yazı mı Tura mı',
    headsTailsDesc: 'Sinaptik fiziksel dönüş simülasyonu',
    flipCoin: 'Yazı Tura At',
    customBinaryTitle: 'Özel İkili Karşılaşma (A vs B)',
    nodeAlpha: 'Alfa Düğümü',
    nodeBeta: 'Beta Düğümü',
    collideNodes: 'Düğümleri Çarpıştır',

    // Outcome Panel
    outcomeNode: 'SONUÇ DÜĞÜMÜ',
    calibrated: 'KALİBRE EDİLDİ',
    resolvingSynapses: 'Sinapslar Çözülüyor...',
    entropyMatching: 'Entropi eşleştirme aktif',
    resolvedOutput: 'Çözümlenen Çıktı',
    copy: 'Kopyala',
    copied: 'Kopyalandı!',
    decideAgain: 'Yeniden Karar Ver',
    awaitingSignal: 'Sinyal Bekleniyor...',
    awaitingSignalDesc: 'Sinaptik ağ yollarını etkinleştirmek için parametreleri yükleyin ve karar ver butonuna tıklayın.',
    neuralLog: 'SİNAPTIK GÜNLÜK',
    flushBuffer: 'BELLEĞİ BOŞALT',

    // Logs & Calculations
    logInitCore: 'Neural Randomizer Çekirdeği başlatıldı.',
    logInitCalib: 'Organik sinaptik bağlantılar kalibre ediliyor... Kararlı.',
    logInitReady: 'Sistem hazır.',
    logFlush: 'Günlük belleği operatör tarafından manuel olarak temizlendi.',
    logCognitive: 'Bilişsel karar yolları başlatılıyor...',
    logMapping: 'Durum vektörleri haritalandırılıyor ve kuantum entropi katsayıları yükleniyor...',
    logEvaluating: 'Gürültü kısıtlamaları altında karar topolojisi değerlendiriliyor...',
    logOutcomeResolved: 'Sinaptik sonuç çözümlendi:',
    logDecideAborted: 'Karar işlemi iptal edildi:',
    logBufferUpdated: 'Bellek güncellendi: {count} seçenek vektörü eklendi. Mevcut bellek: {total}',
    logVectorRemoved: 'Vektör {index} indeksinden kaldırıldı. Kalan: {total}',
    logCleared: 'Bellek tamamen temizlendi.',
    logLoadedPreset: 'Hazır şablon yüklendi: "{name}" ({count} değişken)',
    logValidationErrorRange: 'Doğrulama hatası: Min eşiği, Max eşiğinden küçük olmalıdır.',
    logValidationErrorCount: 'Doğrulama hatası: Çıktı üretim adedi 1 ile 100 arasında olmalıdır.',
    logValidationErrorBinary: 'Doğrulama hatası: Her iki ikili düğümün de etiketi olmalıdır.',
    logValidationSpace: 'Çakışmayan tam sayı aralığı için yetersiz alan.',
    logReDecide: 'Yeniden kalibrasyon yeniden karar döngüsü başlatılıyor.',
    logCopied: 'Sinaptik imza panoya kopyalandı: "{val}"',
    logPresetRange: 'Aralık kısayolu yüklendi: {min} ile {max} arası ({count} çıktı)',
    logOracleQuery: 'Kehanet sorgusu yürütülüyor: EVET/HAYIR sinaptik olasılık modeli...',
    logCoinFlipQuery: 'Yazı-tura sorgusu yürütülüyor: İkili kütleçekimsel dönüş modeli...',
    logCustomBinaryCollision: 'Özel ikili çarpışma yürütülüyor: "{choiceA}" ile "{choiceB}" karşı karşıya...',

    // Additional info details
    infoWeighted: 'Ağırlıklı Düğüm seçimi. Sinaptik olasılık: %{probability} (Ağırlık {weight}/{total})',
    infoUniform: 'Eşit Olasılıklı Düğüm seçimi. Sinaptik olasılık: %{probability}',
    infoRangeSweep: 'Sınırlı Aralık Taraması: [{min} ile {max} arası]. Çözümlenen boyutlar: {count}.',
    infoHeads: 'Kütleçekimsel dönüş Üst Düğüm (YAZI) olarak çözümlendi.',
    infoTails: 'Kütleçekimsel dönüş Alt Düğüm (TURA) olarak çözümlendi.',
    infoBinaryWon: 'İkili Düğüm çarpışması tamamlandı. "{winner}" seçeneği "{loser}" seçeneğini eledi.',

    yesnoValues: {
      YES: { value: 'EVET', info: 'Bilişsel uyum, aktif hizalama parametreleriyle eşleşiyor (%87 güven).' },
      NO: { value: 'HAYIR', info: 'Sinaptik sinyal kesintisi algılandı. Yol reddedildi (%91 güvenlik endeksi).' },
      ABSOLUTELY: { value: 'KESİNLİKLE', info: 'Optimum yol vektörü. Oybirliği ile olumlu sonuç olasılığı.' },
      UNLIKELY: { value: 'DÜŞÜK İHTİMAL', info: 'Yüksek entropili geri besleme döngüsü. Olumsuz eğilim önerilir.' },
      RECALIBRATE: { value: 'YENİDEN KALİBRE ET', info: 'Karar matrisi nötr dengede askıya alındı. Yeniden tarama önerilir.' }
    },
    coinValues: {
      HEADS: { value: 'YAZI', info: 'Kütleçekimsel dönüş Üst Düğüm (YAZI) olarak çözümlendi.' },
      TAILS: { value: 'TURA', info: 'Kütleçekimsel dönüş Alt Düğüm (TURA) olarak çözümlendi.' }
    }
  }
};
