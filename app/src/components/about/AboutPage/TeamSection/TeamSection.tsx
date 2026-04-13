import { TeamMember } from "../TeamMember/TeamMember"

export const TeamSection = () => {
  return (
    <section className="team">

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">The Curators</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

        <TeamMember
          name="ALEXIS NOIR"
          role="Founder"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuC5YsWxJtk9nR9QSTx-Won7SV0m4kxFh0Oc5DSOZrAhl2byG4xu3VdwhN__pg8bcBnIsYXqFnIKZ-7FrFhObI_Fr2f7oXbEYnjyF22aDu0G1a-ZLEP2U7lJnP4mUjiZZQh5iJNO-u619EYIRiYO6cp9XbQYeqKYNxFvAkmDeseVDctbakDY8AixLSD3QOyrOI3muLBu2W1n2pP9DzVvGoDJATgpao11TO3S2VViS2uG3Jv9JUhoIaopQNj75K7OCJgrCOhXdp-bU73u"
        />

        <TeamMember
          name="SARAH VOSS"
          role="Curation"
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuAhAKbKXQwdBHRSXKNC3R4biyLJr_SG_99PxUpPlYmxpsdps0Bj9ru9q_ZSLzHV0qNBN1c6P8mq8Jpn_iNhmtjOphgrVo4o_Z54vJ3AZlbw0VjreBMpcJOR5L52rmFUrxHuFLTMhR6qFt3JmMPRJgHqcVYFA9veYoPoXS-0W9JOneWTnTSyZ3iN1Sht3mBnMChxsSvcFeNntqvOH9rPthxWyKc1BW9qiuRL6oJJUmPr18ZAcvRt8Wv2UHqy1XFyUz7BWeOgz5HnxjlE"
        />

      </div>

    </section>
  )
}