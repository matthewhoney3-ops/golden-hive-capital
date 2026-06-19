import InquiryForm from '../components/InquiryForm.jsx'

export default function Contact() {
  return (
    <section className="py-20">
      <div className="max-w-[560px] mx-auto px-8">
        <div className="eyebrow text-xs tracking-[0.3em] text-gold-2 mb-3.5">CONTACT</div>
        <h1 className="font-display font-semibold text-3xl mb-4">Get in touch</h1>
        <p className="text-muted mb-8">
          Questions about a property, or about renting with Golden Hive Capital in general? Send a note and
          we'll get back to you.
        </p>
        <InquiryForm />
      </div>
    </section>
  )
}
