import { useEffect, useState } from "react";

type SiteLocale = "en" | "am";

export const translationMap: Record<string, string> = {
  "Towels": "ታውልስ",
  "Hospitality": "እንግዳነት",
  "About": "ስለእኛ",
  "Contact": "እውቀት",
  "Open menu": "ምናሌ ክፈት",
  "Close menu": "ምናሌ ዝጋ",
  "Hospitality Supply": "የእንግዳነት አቅርቦት",
  "Premium textile programs for elevated guest experiences.": "ለዝርዝር እንግዳ ተሞክሮዎች የተሻለ የጨርቅ ፕሮግራሞች.",
  "Program": "ፕሮግራም",
  "Service": "አገልግሎት",
  "Scope": "አቋም",
  "Guestroom Linens": "የእንግዳ ክፍል ልብስ",
  "Spa & Wellness": "ስፓ እና ደህንነት",
  "Bespoke Orders": "ልዩ ትዕዛዞች",
  "Start inquiry": "ጥያቄ ጀምር",
  "WhatsApp inquiry": "WhatsApp ጥያቄ",
  "Email": "ኢሜይል",
  "Phone": "ስልክ",
  "WhatsApp": "WhatsApp",
  "Reach us": "ያግኙን",
  "Send inquiry": "ጥያቄ አስቀምጥ",
  "Send via WhatsApp": "በWhatsApp እልክ",
  "Order now": "አሁን ይትኩ",
  "WhatsApp order": "WhatsApp ትዕዛዝ",
  "Please complete your name, email, and message before sending.": "እባክዎ ስምዎን፣ ኢሜይልዎን እና መልዕክትዎን ሙሉ ያስገቡ ከላክዎ በፊት።",
  "Spam detected. Please refresh the page and try again.": "ስፓም ተገነዘበ። ገፀ ገጹን ዳግም ይጫኑ እና እንደገና ይሞክሩ።",
  "Success! Your inquiry has been sent. We'll reply to your email shortly.": "በተሳካ ሁኔታ የጥያቄዎን መልዕክት አልከን። በአጥቂ ጊዜ ወደ ኢሜይልዎ እንመለሳለን።",
  "Send failed: ": "ላክን አልተሳካም: ",
  "Hello NileCotton, I would like to share the following inquiry:": "ሰላም ናይልኮቶን፣ የሚከተለውን ጥያቄ ማካፈል እፈልጋለሁ።",
  "Inquiry from": "ጥያቄ ከ",
  "Featured Collections": "ታውቆ የተሰኘ እቃዎች",
  "An editorial rhythm of texture, tone, and hospitality.": "የእቃ ገጽታ፣ ቀለም እና እንግዳነት የሚያገጥም የአርእስት ሙዚቃ.",
  "Collection": "ስብስብ",
  "Hotel Collection": "የሆቴል ስብስብ",
  "Tailored textiles for hospitality environments.": "ለእንግዳነት አካባቢዎች የተስማሚ ጨርቅ.",
  "Signature": "ፊርማ",
  "Product Showcase": "የምርት ታሪክ",
  "Featured": "ታዋቂ",
  "Editorial Lifestyle": "የአርእስት የሕይወት ሁኔታ",
  "Testimonials": "ማስረጃዎች",
  "What hospitality partners say.": "የእንግዳነት ባለቤት ሰዎች የሚናገሩት.",
  "B2B Inquiry": "ኢንታክቭ ጥያቄ",
  "Request hospitality pricing": "የእንግዳ ዋጋ ጥያቄ አቅርብ",
  "Share your property details and receive a premium offer curated for hotels, resorts, spas and luxury residences.": "የንብረትዎን ዝርዝሮች አጋርጥን ለሆቴሎች፣ ሪሰርቶች፣ ስፓዎችና የታላቅ ቤቶች የተለጠፈ የጥቅም እቃ ይዘው ይቀበሉ.",
  "Properties": "ንብረቶች",
  "Suites": "ሱቲዎች",
  "Contact details are used for the sole purpose of managing your request and answering follow-up questions.": "የእውቀት ዝርዝሮች ለጥያቄዎን ማስተናገድ እና ለቀጣይ ጥያቄዎች ለመልስ ብቻ ይጠቀማሉ.",
  "Privacy Policy": "የግላዊ ደህንነት እቅድ",
  "Terms & Conditions": "ውሎች እና ሁኔታዎች",
  "We respect your privacy and protect your hospitality inquiry data.": "የግላዊነትዎን ክብር እና መረጃዎን እንጠብቃለን.",
  "Premium textile service terms built for hospitality procurement and enterprise-class experiences.": "ለእንግዳነት ግዢና ለድርጅት ክፍል ተልማድ የተሰሩ የጨርቅ አገልግሎት ሁኔታዎች.",
  "NileCotton only collects the information needed to respond to your inquiries, support hospitality proposals, and deliver premium service.": "NileCotton ለጥያቄዎት ለመልስ፣ ለእንግዳነት ፕሮፖዛሎች ለማገዝ እና ለላለምድር አገልግሎት የሚያስፈልጉ መረጃዎችን ብቻ ይሰብሳባል.",
  "We do not sell your personal data. Contact details are used for the sole purpose of managing your request and answering follow-up questions.": "የግለሰብ መረጃዎችዎን አንሸጥም። የእውቀት ዝርዝሮች ለጥያቄዎን ማስተናገድ እና ለቀጣይ ጥያቄዎች ለመልስ ብቻ ይጠቀማሉ.",
};

export function useAutoTranslate() {
  const [locale, setLocale] = useState<SiteLocale>("en");

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const browserLocale = (navigator.language || navigator.languages?.[0] || "en").toLowerCase();
    if (browserLocale.startsWith("am")) {
      setLocale("am");
      document.documentElement.lang = "am";
    }
  }, []);

  const t = (key: string, fallback: string) => {
    return locale === "am" ? translationMap[key] ?? fallback : fallback;
  };

  return { locale, t };
}
