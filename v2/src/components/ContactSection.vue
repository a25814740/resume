<script setup>
import { Mail, MapPin, Phone } from '@lucide/vue';
import { profile } from '../data/resume';
</script>

<template>
  <section id="contact" class="section contact-section" aria-labelledby="contact-title">
    <div class="section-heading" data-reveal>
      <p class="eyebrow">Contact</p>
      <h2 id="contact-title">{{ profile.title }}</h2>
    </div>

    <div class="contact-layout" data-reveal>
      <a class="contact-cta" :href="`mailto:${profile.email}`">
        <Mail :size="20" aria-hidden="true" />
        寄信給我
      </a>
      <ul class="contact-list" aria-label="聯絡資訊">
        <li>
          <Mail :size="18" aria-hidden="true" />
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </li>
        <li>
          <Phone :size="18" aria-hidden="true" />
          <a :href="`tel:${profile.phone.replaceAll('-', '')}`">{{ profile.phone }}</a>
        </li>
        <li>
          <MapPin :size="18" aria-hidden="true" />
          <span>{{ profile.location }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
