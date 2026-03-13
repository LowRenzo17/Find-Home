import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Agent } from "@/lib/mockData";
import { Send, Phone, Mail } from "lucide-react";

interface ContactFormProps {
  agent: Agent;
}

const ContactForm = ({ agent }: ContactFormProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inquiry sent!", { description: `${agent.name} will get back to you shortly.` });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="rounded-xl bg-card p-6 shadow-card">
      <div className="mb-5 flex items-center gap-3">
        <img src={agent.avatar} alt={agent.name} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <p className="font-display font-semibold text-foreground">{agent.name}</p>
          <p className="text-xs text-muted-foreground">Listing Agent</p>
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <a
          href={`tel:${agent.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <Phone className="h-3.5 w-3.5" /> Call
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
        >
          <Mail className="h-3.5 w-3.5" /> Email
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Label className="text-xs">Name</Label>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div>
          <Label className="text-xs">Email</Label>
          <Input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
          />
        </div>
        <div>
          <Label className="text-xs">Phone</Label>
          <Input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="(555) 000-0000"
          />
        </div>
        <div>
          <Label className="text-xs">Message</Label>
          <Textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="I'm interested in this property..."
            rows={3}
          />
        </div>
        <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <Send className="mr-2 h-4 w-4" /> Send Inquiry
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
