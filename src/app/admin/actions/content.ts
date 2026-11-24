'use server';

import { createClient } from '@/lib/supabase/server';
import { logAdminActivity } from './auth';
import { revalidatePath } from 'next/cache';
import {
  ProfileRecord,
  SkillRecord,
  ProjectRecord,
  ExperienceRecord,
  EducationRecord,
  AchievementRecord,
  VolunteerActivityRecord,
  SiteSettingsRecord,
} from '@/types/admin';

// -----------------------------------------------------------------------------
// PROFILE ACTIONS
// -----------------------------------------------------------------------------
export async function updateProfileAction(profileData: Partial<ProfileRecord>) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Check if profile exists
    const { data: existing } = await supabase.from('profiles').select('id').limit(1).maybeSingle();

    if (existing?.id) {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('profiles').insert({
        ...profileData,
        user_id: user?.id || null,
      });
      if (error) throw error;
    }

    await logAdminActivity('UPDATE', 'profile', undefined, 'Updated personal profile details');
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/profile');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update profile' };
  }
}

// -----------------------------------------------------------------------------
// SKILLS ACTIONS
// -----------------------------------------------------------------------------
export async function upsertSkillAction(skill: Partial<SkillRecord>) {
  try {
    const supabase = await createClient();
    const isEdit = !!skill.id && !skill.id.startsWith('skill-temp-');

    if (isEdit) {
      const { error } = await supabase
        .from('skills')
        .update({
          name: skill.name,
          category: skill.category,
          level: skill.level,
          tag: skill.tag,
          icon: skill.icon,
          display_order: skill.display_order,
          is_featured: skill.is_featured,
          status: skill.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', skill.id);
      if (error) throw error;
      await logAdminActivity('UPDATE', 'skill', skill.id, `Updated skill: ${skill.name}`);
    } else {
      const { id, ...newSkill } = skill;
      const { data, error } = await supabase.from('skills').insert(newSkill).select('id').single();
      if (error) throw error;
      await logAdminActivity('CREATE', 'skill', data?.id, `Created skill: ${skill.name}`);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/skills');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to save skill' };
  }
}

export async function deleteSkillAction(id: string, name: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) throw error;

    await logAdminActivity('DELETE', 'skill', id, `Deleted skill: ${name}`);
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/skills');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete skill' };
  }
}

// -----------------------------------------------------------------------------
// PROJECTS ACTIONS
// -----------------------------------------------------------------------------
export async function upsertProjectAction(project: Partial<ProjectRecord>) {
  try {
    const supabase = await createClient();
    const isEdit = !!project.id && !project.id.startsWith('temp-');

    if (isEdit) {
      const { error } = await supabase
        .from('projects')
        .update({
          slug: project.slug,
          title: project.title,
          tagline: project.tagline,
          short_description: project.short_description,
          full_description: project.full_description,
          category: project.category,
          technologies: project.technologies,
          features: project.features,
          image_url: project.image_url,
          gallery_urls: project.gallery_urls,
          github_url: project.github_url,
          live_url: project.live_url,
          display_order: project.display_order,
          is_featured: project.is_featured,
          status: project.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', project.id);
      if (error) throw error;
      await logAdminActivity('UPDATE', 'project', project.id, `Updated project: ${project.title}`);
    } else {
      const { id, ...newProject } = project;
      const { data, error } = await supabase.from('projects').insert(newProject).select('id').single();
      if (error) throw error;
      await logAdminActivity('CREATE', 'project', data?.id, `Created project: ${project.title}`);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to save project' };
  }
}

export async function deleteProjectAction(id: string, title: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;

    await logAdminActivity('DELETE', 'project', id, `Deleted project: ${title}`);
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/projects');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete project' };
  }
}

// -----------------------------------------------------------------------------
// EXPERIENCE ACTIONS
// -----------------------------------------------------------------------------
export async function upsertExperienceAction(exp: Partial<ExperienceRecord>) {
  try {
    const supabase = await createClient();
    const isEdit = !!exp.id && !exp.id.startsWith('temp-');

    if (isEdit) {
      const { error } = await supabase
        .from('experience')
        .update({
          role: exp.role,
          organization: exp.organization,
          type: exp.type,
          location: exp.location,
          period: exp.period,
          is_current: exp.is_current,
          description: exp.description,
          skills: exp.skills,
          display_order: exp.display_order,
          status: exp.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', exp.id);
      if (error) throw error;
      await logAdminActivity('UPDATE', 'experience', exp.id, `Updated experience: ${exp.role} at ${exp.organization}`);
    } else {
      const { id, ...newExp } = exp;
      const { data, error } = await supabase.from('experience').insert(newExp).select('id').single();
      if (error) throw error;
      await logAdminActivity('CREATE', 'experience', data?.id, `Created experience: ${exp.role} at ${exp.organization}`);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/experience');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to save experience' };
  }
}

export async function deleteExperienceAction(id: string, role: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('experience').delete().eq('id', id);
    if (error) throw error;

    await logAdminActivity('DELETE', 'experience', id, `Deleted experience: ${role}`);
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/experience');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete experience' };
  }
}

// -----------------------------------------------------------------------------
// EDUCATION ACTIONS
// -----------------------------------------------------------------------------
export async function upsertEducationAction(edu: Partial<EducationRecord>) {
  try {
    const supabase = await createClient();
    const isEdit = !!edu.id && !edu.id.startsWith('temp-');

    if (isEdit) {
      const { error } = await supabase
        .from('education')
        .update({
          institution: edu.institution,
          degree: edu.degree,
          field_of_study: edu.field_of_study,
          period: edu.period,
          location: edu.location,
          status: edu.status,
          highlights: edu.highlights,
          display_order: edu.display_order,
          publication_status: edu.publication_status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', edu.id);
      if (error) throw error;
      await logAdminActivity('UPDATE', 'education', edu.id, `Updated education: ${edu.degree}`);
    } else {
      const { id, ...newEdu } = edu;
      const { data, error } = await supabase.from('education').insert(newEdu).select('id').single();
      if (error) throw error;
      await logAdminActivity('CREATE', 'education', data?.id, `Created education: ${edu.degree}`);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/education');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to save education' };
  }
}

export async function deleteEducationAction(id: string, degree: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('education').delete().eq('id', id);
    if (error) throw error;

    await logAdminActivity('DELETE', 'education', id, `Deleted education: ${degree}`);
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/education');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete education' };
  }
}

// -----------------------------------------------------------------------------
// ACHIEVEMENTS ACTIONS
// -----------------------------------------------------------------------------
export async function upsertAchievementAction(ach: Partial<AchievementRecord>) {
  try {
    const supabase = await createClient();
    const isEdit = !!ach.id && !ach.id.startsWith('temp-');

    if (isEdit) {
      const { error } = await supabase
        .from('achievements')
        .update({
          title: ach.title,
          category: ach.category,
          issuer: ach.issuer,
          date: ach.date,
          description: ach.description,
          badge: ach.badge,
          certificate_url: ach.certificate_url,
          verification_url: ach.verification_url,
          display_order: ach.display_order,
          status: ach.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ach.id);
      if (error) throw error;
      await logAdminActivity('UPDATE', 'achievement', ach.id, `Updated achievement: ${ach.title}`);
    } else {
      const { id, ...newAch } = ach;
      const { data, error } = await supabase.from('achievements').insert(newAch).select('id').single();
      if (error) throw error;
      await logAdminActivity('CREATE', 'achievement', data?.id, `Created achievement: ${ach.title}`);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/achievements');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to save achievement' };
  }
}

export async function deleteAchievementAction(id: string, title: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (error) throw error;

    await logAdminActivity('DELETE', 'achievement', id, `Deleted achievement: ${title}`);
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/achievements');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete achievement' };
  }
}

// -----------------------------------------------------------------------------
// VOLUNTEER ACTIVITIES ACTIONS
// -----------------------------------------------------------------------------
export async function upsertVolunteerActivityAction(vol: Partial<VolunteerActivityRecord>) {
  try {
    const supabase = await createClient();
    const isEdit = !!vol.id && !vol.id.startsWith('temp-');

    if (isEdit) {
      const { error } = await supabase
        .from('volunteer_activities')
        .update({
          organization: vol.organization,
          role: vol.role,
          project_name: vol.project_name,
          description: vol.description,
          date: vol.date,
          event_images: vol.event_images,
          related_links: vol.related_links,
          display_order: vol.display_order,
          status: vol.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', vol.id);
      if (error) throw error;
      await logAdminActivity('UPDATE', 'volunteer', vol.id, `Updated volunteer activity: ${vol.project_name}`);
    } else {
      const { id, ...newVol } = vol;
      const { data, error } = await supabase.from('volunteer_activities').insert(newVol).select('id').single();
      if (error) throw error;
      await logAdminActivity('CREATE', 'volunteer', data?.id, `Created volunteer activity: ${vol.project_name}`);
    }

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/volunteer');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to save volunteer activity' };
  }
}

export async function deleteVolunteerActivityAction(id: string, name: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('volunteer_activities').delete().eq('id', id);
    if (error) throw error;

    await logAdminActivity('DELETE', 'volunteer', id, `Deleted volunteer activity: ${name}`);
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/volunteer');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete volunteer activity' };
  }
}

// -----------------------------------------------------------------------------
// SETTINGS ACTIONS (Appearance, SEO, General)
// -----------------------------------------------------------------------------
export async function updateSiteSettingsAction(settings: Partial<SiteSettingsRecord>) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('site_settings')
      .upsert({
        id: 'current_settings',
        ...settings,
        updated_at: new Date().toISOString(),
      });
    if (error) throw error;

    await logAdminActivity('UPDATE', 'settings', 'current_settings', 'Updated website settings & appearance');
    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/admin/appearance');
    revalidatePath('/admin/seo');
    revalidatePath('/admin/settings');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to update site settings' };
  }
}

// -----------------------------------------------------------------------------
// MEDIA ASSETS ACTIONS
// -----------------------------------------------------------------------------
export async function registerMediaAssetAction(asset: {
  name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category: 'profile' | 'project' | 'certificate' | 'event' | 'general';
}) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('media_assets').insert(asset);
    if (error) throw error;

    await logAdminActivity('CREATE', 'media', undefined, `Uploaded media: ${asset.name}`);
    revalidatePath('/admin/media');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to record media asset' };
  }
}

export async function deleteMediaAssetAction(id: string, name: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('media_assets').delete().eq('id', id);
    if (error) throw error;

    await logAdminActivity('DELETE', 'media', id, `Removed media item: ${name}`);
    revalidatePath('/admin/media');
    return { success: true };
  } catch (err: any) {
    return { error: err.message || 'Failed to delete media asset' };
  }
}
